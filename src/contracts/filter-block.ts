interface UserItem {
  id: string;
  account: string;
}

const Filter_Block = function (blocks: UserItem[], unblocks: UserItem[]) {
  const filteredBlocks = blocks.filter((block) => {
    let blockCount: number = 0;
    let unblockCount: number = 0;
    blocks.forEach((account) => {
      if (block.account === account.account) blockCount++;
    });
    unblocks.forEach((account) => {
      if (block.account === account.account) unblockCount++;
    });
    return blockCount - unblockCount > 0;
  });
  return filteredBlocks;
};

export default Filter_Block;
