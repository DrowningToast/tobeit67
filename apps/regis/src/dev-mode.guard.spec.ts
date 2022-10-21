import { DevModeGuard } from './dev-mode.guard';

describe('DevModeGuard', () => {
  it('should be defined', () => {
    expect(new DevModeGuard()).toBeDefined();
  });
});
