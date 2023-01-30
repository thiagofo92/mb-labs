export interface EventUseCaseContract {
  findAll: () => Promise<unknown>
  findByType: () => Promise<unknown>
  findByRangeOfDate: () => Promise<unknown>
}
