import {
  expect
} from 'chai'
import {
  getChangedOrganizations,
  hasChangedOrganizations,
  getRemovedOrganizations,
  hasRemovedOrganizations,
  getAddedOrganizations,
  hasAddedOrganizations
} from '#application/organizations'

describe('`#application/organizations`', () => {
  describe('getChangedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns an array of changed organizations', () => expect(getChangedOrganizations(was, now)).to.eql([{ name: 'C', display_name: 'X' }]))
    })

    describe('Organizations are not changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns an array', () => expect(getChangedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns an array', () => expect(getChangedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns an array of changed organizations', () => expect(getChangedOrganizations(was, now)).to.eql([{ name: 'B', display_name: 'X' }]))
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns an array', () => expect(getChangedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array of changed organizations', () => expect(getChangedOrganizations(was, now)).to.eql([{ name: 'C', display_name: 'X' }]))
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array of changed organizations', () => expect(getChangedOrganizations(was, now)).to.eql([{ name: 'C', display_name: 'X' }]))
    })
  })

  describe('hasChangedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns true', () => expect(hasChangedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are not changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns false', () => expect(hasChangedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns false', () => expect(hasChangedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns true', () => expect(hasChangedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns false', () => expect(hasChangedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are changed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasChangedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasChangedOrganizations(was, now)).to.be.true)
    })
  })

  describe('getRemovedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns an array', () => expect(getRemovedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns an array of removed organizations', () => expect(getRemovedOrganizations(was, now)).to.eql([{ name: 'C', display_name: 'C' }]))
    })

    describe('Organizations are not removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns an array', () => expect(getRemovedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns an array of removed organizations', () => expect(getRemovedOrganizations(was, now)).to.eql([{ name: 'C', display_name: 'C' }]))
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns an array', () => expect(getRemovedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array', () => expect(getRemovedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array of removed organizations', () => expect(getRemovedOrganizations(was, now)).to.eql([{ name: 'B', display_name: 'B' }]))
    })
  })

  describe('hasRemovedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns false', () => expect(hasRemovedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns true', () => expect(hasRemovedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are not removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns false', () => expect(hasRemovedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns true', () => expect(hasRemovedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns false', () => expect(hasRemovedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasRemovedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasRemovedOrganizations(was, now)).to.be.true)
    })
  })

  describe('getAddedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns an array', () => expect(getAddedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns an array', () => expect(getAddedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns an array', () => expect(getAddedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns an array of added organizations', () => expect(getAddedOrganizations(was, now)).to.eql([{ name: 'D', display_name: 'D' }]))
    })

    describe('Organizations are not added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns an array', () => expect(getAddedOrganizations(was, now)).to.eql([]))
    })

    describe('Organizations are changed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array of added organizations', () => expect(getAddedOrganizations(was, now)).to.eql([{ name: 'D', display_name: 'D' }]))
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns an array of added organizations', () => expect(getAddedOrganizations(was, now)).to.eql([{ name: 'D', display_name: 'D' }]))
    })
  })

  describe('hasAddedOrganizations()', () => {
    describe('Organizations are changed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'X' }]

      it('returns false', () => expect(hasAddedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }]

      it('returns false', () => expect(hasAddedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'X' }]

      it('returns false', () => expect(hasAddedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasAddedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are not added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]

      it('returns false', () => expect(hasAddedOrganizations(was, now)).to.be.false)
    })

    describe('Organizations are removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'C' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasAddedOrganizations(was, now)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const was = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const now = [{ name: 'A', display_name: 'A' }, { name: 'C', display_name: 'X' }, { name: 'D', display_name: 'D' }]

      it('returns true', () => expect(hasAddedOrganizations(was, now)).to.be.true)
    })
  })
})
