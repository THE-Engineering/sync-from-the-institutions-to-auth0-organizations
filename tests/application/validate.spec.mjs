import {
  expect
} from 'chai'
import validate, {
  hasChanged,
  hasRemoved,
  hasAdded
} from '#application/validate'

describe('`#application/validate`', () => {
  describe('validate()', () => {
    describe('Organizations are changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })

    describe('Organizations are not changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns false', () => expect(hasChanged(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })

    describe('Organizations are not removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns true', () => expect(validate(organizations, institutions)).to.be.true)
    })

    describe('Organizations are added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })

    describe('Organizations are not added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns true', () => expect(validate(organizations, institutions)).to.be.true)
    })

    describe('Organizations are changed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasChanged(organizations, institutions)).to.be.true)
    })

    describe('Organizations are changed or removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'X' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })

    describe('Organizations are changed or removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns false', () => expect(validate(organizations, institutions)).to.be.false)
    })
  })

  describe('hasChanged()', () => {
    describe('Organizations are changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }] }

      it('returns true', () => expect(hasChanged(organizations, institutions)).to.be.true)
    })

    describe('Organizations are not changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns false', () => expect(hasChanged(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }] }

      it('returns false', () => expect(hasChanged(organizations, institutions)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'X' }] }

      it('returns true', () => expect(hasChanged(organizations, institutions)).to.be.true)
    })

    describe('Organizations are added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns false', () => expect(hasChanged(organizations, institutions)).to.be.false)
    })

    describe('Organizations are changed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasChanged(organizations, institutions)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasChanged(organizations, institutions)).to.be.true)
    })
  })

  describe('hasRemoved()', () => {
    describe('Organizations are changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }] }

      it('returns false', () => expect(hasRemoved(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }] }

      it('returns true', () => expect(hasRemoved(organizations, institutions)).to.be.true)
    })

    describe('Organizations are not removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns false', () => expect(hasRemoved(organizations, institutions)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'X' }] }

      it('returns true', () => expect(hasRemoved(organizations, institutions)).to.be.true)
    })

    describe('Organizations are added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns false', () => expect(hasRemoved(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasRemoved(organizations, institutions)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasRemoved(organizations, institutions)).to.be.true)
    })
  })

  describe('hasAdded()', () => {
    describe('Organizations are changed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'X' }] }

      it('returns false', () => expect(hasAdded(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }] }

      it('returns false', () => expect(hasAdded(organizations, institutions)).to.be.false)
    })

    describe('Organizations are changed or removed', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'X' }] }

      it('returns false', () => expect(hasAdded(organizations, institutions)).to.be.false)
    })

    describe('Organizations are added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasAdded(organizations, institutions)).to.be.true)
    })

    describe('Organizations are not added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'B', name: 'B' }, { iid: 'C', name: 'C' }] }

      it('returns false', () => expect(hasAdded(organizations, institutions)).to.be.false)
    })

    describe('Organizations are removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'C' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasAdded(organizations, institutions)).to.be.true)
    })

    describe('Organizations are changed or removed or added', () => {
      const organizations = [{ name: 'A', display_name: 'A' }, { name: 'B', display_name: 'B' }, { name: 'C', display_name: 'C' }]
      const institutions = { rows: [{ iid: 'A', name: 'A' }, { iid: 'C', name: 'X' }, { iid: 'D', name: 'D' }] }

      it('returns true', () => expect(hasAdded(organizations, institutions)).to.be.true)
    })
  })
})
