import HomeRoute from 'routes/Home'

describe('(Route) Home', () => {
  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute({})).to.equal('object')
  })
})
