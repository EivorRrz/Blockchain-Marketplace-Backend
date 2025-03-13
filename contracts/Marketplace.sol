
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Marketplace is Initializable, ERC721Upgradeable, OwnableUpgradeable {
    struct Item {
         uint256 tokenId;
         address seller;
         uint256 price;
         bool sold;
    }

    uint256 public itemCounter;
    mapping(uint256 => Item) public items;

    event ItemMinted(uint256 tokenId, address seller, uint256 price);
    event ItemSold(uint256 tokenId);

    function initialize() public initializer {
         __ERC721_init("MarketplaceNFT", "MNFT");
         __Ownable_init();
         itemCounter = 0;
    }

    function mintAndList(address to, uint256 price) public returns(uint256) {
         itemCounter++;
         uint256 tokenId = itemCounter;
         _mint(to, tokenId);
         items[tokenId] = Item(tokenId, to, price, false);
         emit ItemMinted(tokenId, to, price);
         return tokenId;
    }

    function markAsSold(uint256 tokenId) public {
         require(ownerOf(tokenId) == msg.sender, "Not owner");
         items[tokenId].sold = true;
         emit ItemSold(tokenId);
    }
}
