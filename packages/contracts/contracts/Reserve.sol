// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Reserve is Initializable, OwnableUpgradeable {
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  event Deposit(address token, uint256 amount, address sender);

  function initialize() public initializer {}

  // 提现转账给用户
  function withdraw(address erc20, uint256 withdrawAmount, address target) public onlyOwner {
    require(withdrawAmount > 0, "Invalid token amount");

    IERC20 token = IERC20(erc20);

    require(token.balanceOf(address(this)) >= withdrawAmount, "Insufficient balance");

    token.safeApprove(address(this), withdrawAmount);
    token.safeTransferFrom(address(this), target, withdrawAmount);
  }

  // 提现 ETH
  function withdrawETH(uint256 amount, address target) public onlyOwner {
    require(amount > 0, "Invalid token amount");
    require(address(this).balance >= amount, "Insufficient balance");

    payable(target).transfer(amount);
  }

  // 充值到合约
  function depositERC20(address erc20, uint256 amount) public {
    IERC20 token = IERC20(erc20);

    require(amount > 0, "Invalid token amount");
    require(token.allowance(msg.sender, address(this)) >= amount, "Insufficient balance");
    require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");

    token.safeTransferFrom(msg.sender, address(this), amount);

    emit Deposit(erc20, amount, msg.sender);
  }

  // 存 ETH
  function depositETH() public payable {
    emit Deposit(address(0), msg.value, msg.sender);
  }
}
