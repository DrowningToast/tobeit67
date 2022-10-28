import { Test, TestingModule } from '@nestjs/testing';
import { ReservationResolver } from './reservation.resolver';

describe('ReservationResolver', () => {
  let resolver: ReservationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationResolver],
    }).compile();

    resolver = module.get<ReservationResolver>(ReservationResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
