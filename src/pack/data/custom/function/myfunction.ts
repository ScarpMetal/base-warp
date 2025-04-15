import { createCommand } from '../../../../utils/createCommand.js';
import { give } from '../../../../utils/commands.js';

// Give one diamond block to the executing player
console.log(give('@s', 'diamond_block', 1));

for (let i = 0; i < 10; i++) {
  createCommand(give('@s', 'diamond_block', 1));
}
