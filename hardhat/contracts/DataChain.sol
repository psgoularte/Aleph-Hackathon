// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint32, externalEuint32 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title DataChain – Zama FHE Hackathon MVP
 * @notice Single-contract marketplace that matches your landing pages:
 *         - Profile (seller): set encrypted fields and publish a listing (Health/Finance/Identity/All + price).
 *         - Buy Data (buyer): browse active sellers by category, buy, and get decrypt permission for that category.
 *         - Home: on-chain directory + lightweight analytics (counts/revenue/lastSaleAt).
 *
 *         Sensitive values are stored as FHE-encrypted integers (euint32).
 *         After purchase, the contract grants decryption permission to the buyer for the relevant fields via FHE.allow.
 *
 * @dev Hackathon-grade. For production, consider:
 *      - Pull-payments (escrow + withdraw) instead of direct payout
 *      - Expiring access grants (copy ephemeral values) instead of permanent allows
 *      - ERC-20 payments and meta-txs for UX
 *      - Sharding/factories if storage grows
 */
contract DataChain is SepoliaConfig, Ownable, ReentrancyGuard {
    enum Kind { HEALTH, FINANCE, IDENTITY, ALL }

    struct EncProfileHealth{ 
        euint32 age;
        euint32 gender;
        euint32 height;
        euint32 weight;
        euint32 bloodType;
        euint32 medCondition;
    }
    
    struct EncProfileFinance{
        euint32 fullName;
        euint32 incomeBand;
        euint32 employmentStatus;
        euint32 creditScoreRange;
        euint32 bankAccounts;
        euint32 portfolioLevel; 
    }

    struct EncProfileIdentity{
        euint32 profession;
        euint32 location;
        euint32 educationLevel;
        euint32 interests;
        euint32 socialMediaUsage;
        euint32 shoppingHabits;
    }

    // Public listing (what appears on “Buy Data”)
    struct Listing {
        Kind kind;
        uint256 price;
        bool active;     
        uint32 saleCount;
        uint128 totalRevenue;
        uint64 lastSaleAt;
    }

    // Seller -> encrypted profile
    mapping(address => EncProfileHealth) private _healthProfile;
    mapping(address => EncProfileFinance) private _financeProfile;
    mapping(address => EncProfileIdentity) private _identityProfile;


    // Seller -> current listing
    mapping(address => Listing) public listings;

    // On-chain directory by category (for the Buy page)
    mapping(uint8 => address[]) private sellersByKind;
    mapping(address => bool) private inDirectory;
    mapping(address => uint8) private dirKind;
    mapping(address => uint256) private dirIndex;

    // Optional UI helper: who has access to what (bit0 Health, bit1 Finance, bit2 Identity, bit3 All)
    mapping(address => mapping(address => uint8)) public buyerAccessMask;

    // Minimal platform fee (default 0) – matches “Instant payments with minimal fees”
    uint16 public feeBps;            
    address public feeRecipient;

    // Events
    event ListingUpdated(address indexed seller, Kind kind, uint256 price, bool active);
    event Purchased(address indexed buyer, address indexed seller, Kind kind, uint256 price, uint256 fee);
    event FieldUpdated(address indexed seller, string fieldName);
    event FeeParamsChanged(uint16 feeBps, address feeRecipient);

    constructor() Ownable(msg.sender) {
        feeRecipient = msg.sender;
        feeBps = 0; // no fee by default
    }

    // =========================
    // SELLER – PROFILE (Profile page)
    // =========================

    /// @notice Set identity profile (encrypted).
    function setMyProfession(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].profession = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].profession);
        emit FieldUpdated(msg.sender, "identity.profession");
    }
    function setMyLocation(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].location = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].location);
        emit FieldUpdated(msg.sender, "identity.location");
    }
    function setMyEducationLevel(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].educationLevel = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].educationLevel);
        emit FieldUpdated(msg.sender, "identity.educationLevel");
    }
    function setMyInterests(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].interests = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].interests);
        emit FieldUpdated(msg.sender, "identity.interests");
    }
    function setMySocialMediaUsage(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].socialMediaUsage = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].socialMediaUsage);
        emit FieldUpdated(msg.sender, "identity.socialMediaUsage");
    }
    function setMyShoppingHabits(externalEuint32 input, bytes calldata proof) external {
        _identityProfile[msg.sender].shoppingHabits = FHE.fromExternal(input, proof);
        _grantSelf(_identityProfile[msg.sender].shoppingHabits);
        emit FieldUpdated(msg.sender, "identity.shoppingHabits");
    }


    /// @notice Set your health profile (encrypted).

    function setMyGender(externalEuint32 input, bytes calldata proof) external {
        _healthProfile[msg.sender].gender = FHE.fromExternal(input, proof);
        _grantSelf(_healthProfile[msg.sender].gender);
        emit FieldUpdated(msg.sender, "gender");
    }    
    
    function setMyHeightCm(externalEuint32 input, bytes calldata proof) external {
        _healthProfile[msg.sender].height = FHE.fromExternal(input, proof);
        _grantSelf(_healthProfile[msg.sender].height);
        emit FieldUpdated(msg.sender, "height");
    }    
    function setMyWeightKg(externalEuint32 input, bytes calldata proof) external {
        _healthProfile[msg.sender].weight = FHE.fromExternal(input, proof);
        _grantSelf(_healthProfile[msg.sender].weight);
        emit FieldUpdated(msg.sender, "weight");
    }    
    function setMyBloodType(externalEuint32 input, bytes calldata proof) external {
        _healthProfile[msg.sender].bloodType = FHE.fromExternal(input, proof);
        _grantSelf(_healthProfile[msg.sender].bloodType);
        emit FieldUpdated(msg.sender, "bloodType");
    }    
    function setMyMedCondition(externalEuint32 input, bytes calldata proof) external {
        _healthProfile[msg.sender].medCondition = FHE.fromExternal(input, proof);
        _grantSelf(_healthProfile[msg.sender].medCondition);
        emit FieldUpdated(msg.sender, "medCondition");
    }
    
    /// @notice Set your financial profile (encrypted)
    
    function setMyIncomeBand(externalEuint32 input, bytes calldata proof) external {
        _financeProfile[msg.sender].incomeBand = FHE.fromExternal(input, proof);
        _grantSelf(_financeProfile[msg.sender].incomeBand);
        emit FieldUpdated(msg.sender, "incomeBand");
    }
    function setMyCreditBand(externalEuint32 input, bytes calldata proof) external {
        _financeProfile[msg.sender].creditScoreRange = FHE.fromExternal(input, proof);
        _grantSelf(_financeProfile[msg.sender].creditScoreRange);
        emit FieldUpdated(msg.sender, "creditScoreRange");
    }
    function setMyBankAccounts(externalEuint32 input, bytes calldata proof) external {
        _financeProfile[msg.sender].bankAccounts = FHE.fromExternal(input, proof);
        _grantSelf(_financeProfile[msg.sender].bankAccounts);
        emit FieldUpdated(msg.sender, "bankAccounts");
    }
    function setMyPortfolioLevel(externalEuint32 input, bytes calldata proof) external {
        _financeProfile[msg.sender].portfolioLevel = FHE.fromExternal(input, proof);
        _grantSelf(_financeProfile[msg.sender].portfolioLevel);
        emit FieldUpdated(msg.sender, "portfolioLevel");
    }

    
    /**
     * @notice Publish/update your public listing (one listing per seller).
     * @param kind Category offered (HEALTH/FINANCE/IDENTITY/ALL).
     * @param priceWei Price in wei (ETH on Sepolia).
     * @param active Whether it appears in the directory.
     */
    
    function setMyListing(Kind kind, uint256 priceWei, bool active) external {
        Listing storage L = listings[msg.sender];

        // Maintain category directory
        if (active) {
            if (!L.active) {
                _dirAdd(msg.sender, kind);
            } else if (L.kind != kind) {
                _dirMove(msg.sender, kind);
            }
        } else if (L.active) {
            _dirRemove(msg.sender);
        }

        L.kind = kind;
        L.price = priceWei;
        L.active = active;

        emit ListingUpdated(msg.sender, kind, priceWei, active);
    }

    // =========================
    // BUYER – BUY DATA (Buy Data page)
    // =========================


    /**
     * @notice Buy a seller’s listing by paying the exact price in ETH.
     * @dev Grants decryption permission for the purchased category only.
     */
    function buy(address seller) external payable nonReentrant {
        Listing storage L = listings[seller];
        require(L.active, "listing inactive");
        require(msg.value == L.price, "wrong price");

        // Optional platform fee
        uint256 fee = (feeBps == 0) ? 0 : (msg.value * feeBps) / 10000;
        uint256 payout = msg.value - fee;

        // Grant decryption based on category
        if (L.kind == Kind.HEALTH) {
            _allowHealth(seller, msg.sender);
            buyerAccessMask[seller][msg.sender] |= uint8(1 << 0);
        } else if (L.kind == Kind.FINANCE) {
            _allowFinance(seller, msg.sender);
            buyerAccessMask[seller][msg.sender] |= uint8(1 << 1);
        } else if (L.kind == Kind.IDENTITY) {
            _allowIdentity(seller, msg.sender);
            buyerAccessMask[seller][msg.sender] |= uint8(1 << 2);
        } else {
            _allowHealth(seller, msg.sender);
            _allowFinance(seller, msg.sender);
            _allowIdentity(seller, msg.sender);
            buyerAccessMask[seller][msg.sender] |= uint8(1 << 3);
        }

        // Analytics
        unchecked { L.saleCount += 1; }
        L.totalRevenue += uint128(msg.value);
        L.lastSaleAt = uint64(block.timestamp);

        emit Purchased(msg.sender, seller, L.kind, L.price, fee);

        // Payouts
        if (fee > 0 && feeRecipient != address(0)) {
            (bool okFee, ) = payable(feeRecipient).call{ value: fee }("");
            require(okFee, "fee transfer failed");
        }
        (bool ok, ) = payable(seller).call{ value: payout }("");
        require(ok, "payout failed");
    }

    // =========================
    // DIRECTORY – Home / Buy Data
    // =========================

    /// @notice Get active sellers for a category.
    function getSellersByKind(Kind kind) external view returns (address[] memory) {
        return sellersByKind[uint8(kind)];
    }

    /// @notice Get a seller’s listing (for cards + analytics).
    function getListing(address seller)
        external
        view
        returns (Kind kind, uint256 price, bool active, uint32 saleCount, uint128 totalRevenue, uint64 lastSaleAt)
    {
        Listing memory L = listings[seller];
        return (L.kind, L.price, L.active, L.saleCount, L.totalRevenue, L.lastSaleAt);
    }

    // =========================
    // READ – handles for user decryption (Relayer SDK)
    // =========================

    // Health Getters
    function getAge(address user) external view returns (euint32) { 
        return _healthProfile[user].age; 
    }
    
    function getGender(address user) external view returns (euint32) { 
        return _healthProfile[user].gender; 
    }
    
    function getHeight(address user) external view returns (euint32) { 
        return _healthProfile[user].height; 
    }
    
    function getWeight(address user) external view returns (euint32) { 
        return _healthProfile[user].weight; 
    }
    
    function getBloodType(address user) external view returns (euint32) { 
        return _healthProfile[user].bloodType; 
    }
    
    function getMedicalConditions(address user) external view returns (euint32) { 
        return _healthProfile[user].medCondition; 
    }

    // Finance Getters
    function getFullName(address user) external view returns (euint32) { 
        return _financeProfile[user].fullName; 
    }
    
    function getIncomeBand(address user) external view returns (euint32) { 
        return _financeProfile[user].incomeBand; 
    }
    
    function getEmploymentStatus(address user) external view returns (euint32) { 
        return _financeProfile[user].employmentStatus; 
    }
    
    function getCreditScoreRange(address user) external view returns (euint32) { 
        return _financeProfile[user].creditScoreRange; 
    }
    
    function getBankAccounts(address user) external view returns (euint32) { 
        return _financeProfile[user].bankAccounts; 
    }
    
    function getPortfolioLevel(address user) external view returns (euint32) { 
        return _financeProfile[user].portfolioLevel; 
    }

    // Identity Getters
    function getProfession(address user) external view returns (euint32) { 
        return _identityProfile[user].profession; 
    }
    
    function getLocation(address user) external view returns (euint32) { 
        return _identityProfile[user].location; 
    }
    
    function getEducationLevel(address user) external view returns (euint32) { 
        return _identityProfile[user].educationLevel; 
    }
    
    function getInterests(address user) external view returns (euint32) { 
        return _identityProfile[user].interests; 
    }
    
    function getSocialMediaUsage(address user) external view returns (euint32) { 
        return _identityProfile[user].socialMediaUsage; 
    }
    
    function getShoppingHabits(address user) external view returns (euint32) { 
        return _identityProfile[user].shoppingHabits; 
    }
    

    // =========================
    // OWNER – optional platform fee
    // =========================

    function setFeeParams(uint16 _feeBps, address _feeRecipient) external onlyOwner {
        require(_feeBps <= 1000, "fee too high"); // <= 10% cap for demo
        feeBps = _feeBps;
        feeRecipient = _feeRecipient;
        emit FeeParamsChanged(feeBps, feeRecipient);
    }

    // =========================
    // INTERNALS
    // =========================

    /// @dev Allow seller to decrypt own value; allow contract to operate on it.
    function _grantSelf(euint32 v) internal {
        FHE.allow(v, msg.sender);
        FHE.allowThis(v);
    }

    /// @dev Grant buyer decryption for health fields.
    function _allowHealth(address seller, address buyer) internal {
        FHE.allow(_healthProfile[seller].gender, buyer);
        FHE.allow(_healthProfile[seller].height, buyer);
        FHE.allow(_healthProfile[seller].weight, buyer);
        FHE.allow(_healthProfile[seller].bloodType, buyer);
        FHE.allow(_healthProfile[seller].medCondition, buyer);
  }
    /// @dev Grant buyer decryption for financial fields.
    function _allowFinance(address seller, address buyer) internal {
        FHE.allow(_financeProfile[seller].incomeBand, buyer);
        FHE.allow(_financeProfile[seller].creditScoreRange, buyer);
        FHE.allow(_financeProfile[seller].bankAccounts, buyer);
        FHE.allow(_financeProfile[seller].portfolioLevel, buyer);
    }

    /// @dev Grant buyer decryption for identity fields.
    function _allowIdentity(address seller, address buyer) internal {
        FHE.allow(_healthProfile[seller].age, buyer);
        FHE.allow(_identityProfile[seller].location, buyer);
        FHE.allow(_identityProfile[seller].profession, buyer);
    }

    // --- Directory maintenance ---

    function _dirAdd(address seller, Kind kind) internal {
        require(!inDirectory[seller], "already listed");
        uint8 k = uint8(kind);
        dirKind[seller] = k;
        dirIndex[seller] = sellersByKind[k].length;
        sellersByKind[k].push(seller);
        inDirectory[seller] = true;
    }

    function _dirRemove(address seller) internal {
        require(inDirectory[seller], "not listed");
        uint8 k = dirKind[seller];
        uint256 idx = dirIndex[seller];
        address[] storage arr = sellersByKind[k];
        uint256 last = arr.length - 1;
        if (idx != last) {
            address moved = arr[last];
            arr[idx] = moved;
            dirIndex[moved] = idx;
        }
        arr.pop();
        inDirectory[seller] = false;
    }

    function _dirMove(address seller, Kind newKind) internal {
        _dirRemove(seller);
        _dirAdd(seller, newKind);
    }
}
