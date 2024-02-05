import { expect } from 'chai';
import {
  getChangedInstitutions,
  hasChangedInstitutions,
  getRemovedInstitutions,
  hasRemovedInstitutions,
  getAddedInstitutions,
  hasAddedInstitutions,
} from '#application/institutions';

describe('`#application/institutions`', () => {
  describe('getChangedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns an array of changed institutions', () =>
        expect(getChangedInstitutions(was, now)).to.eql([{ iid: 'C', name: 'X' }]));
    });

    describe('Institutions are not changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns an array', () => expect(getChangedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns an array', () => expect(getChangedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns an array of changed institutions', () =>
        expect(getChangedInstitutions(was, now)).to.eql([{ iid: 'B', name: 'X' }]));
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array', () => expect(getChangedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of changed institutions', () =>
        expect(getChangedInstitutions(was, now)).to.eql([{ iid: 'C', name: 'X' }]));
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of changed institutions', () =>
        expect(getChangedInstitutions(was, now)).to.eql([{ iid: 'C', name: 'X' }]));
    });
  });

  describe('hasChangedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns true', () => expect(hasChangedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are not changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns false', () => expect(hasChangedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns false', () => expect(hasChangedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns true', () => expect(hasChangedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns false', () => expect(hasChangedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are changed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasChangedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasChangedInstitutions(was, now)).to.be.true);
    });
  });

  describe('getRemovedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns an array', () => expect(getRemovedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns an array of removed institutions', () =>
        expect(getRemovedInstitutions(was, now)).to.eql([{ iid: 'C', name: 'C' }]));
    });

    describe('Institutions are not removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns an array', () => expect(getRemovedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns an array of removed institutions', () =>
        expect(getRemovedInstitutions(was, now)).to.eql([{ iid: 'C', name: 'C' }]));
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array', () => expect(getRemovedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array', () => expect(getRemovedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of removed institutions', () =>
        expect(getRemovedInstitutions(was, now)).to.eql([{ iid: 'B', name: 'B' }]));
    });
  });

  describe('hasRemovedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns false', () => expect(hasRemovedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns true', () => expect(hasRemovedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are not removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns false', () => expect(hasRemovedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns true', () => expect(hasRemovedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns false', () => expect(hasRemovedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasRemovedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasRemovedInstitutions(was, now)).to.be.true);
    });
  });

  describe('getAddedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns an array', () => expect(getAddedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns an array', () => expect(getAddedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns an array', () => expect(getAddedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of added institutions', () =>
        expect(getAddedInstitutions(was, now)).to.eql([{ iid: 'D', name: 'D' }]));
    });

    describe('Institutions are not added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns an array', () => expect(getAddedInstitutions(was, now)).to.eql([]));
    });

    describe('Institutions are changed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of added institutions', () =>
        expect(getAddedInstitutions(was, now)).to.eql([{ iid: 'D', name: 'D' }]));
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns an array of added institutions', () =>
        expect(getAddedInstitutions(was, now)).to.eql([{ iid: 'D', name: 'D' }]));
    });
  });

  describe('hasAddedInstitutions()', () => {
    describe('Institutions are changed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'X' },
        ],
      };

      it('returns false', () => expect(hasAddedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
        ],
      };

      it('returns false', () => expect(hasAddedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are changed or removed', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'X' },
        ],
      };

      it('returns false', () => expect(hasAddedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasAddedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are not added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };

      it('returns false', () => expect(hasAddedInstitutions(was, now)).to.be.false);
    });

    describe('Institutions are removed or added', () => {
      const was = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'B', name: 'B' },
          { iid: 'C', name: 'C' },
        ],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'C' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasAddedInstitutions(was, now)).to.be.true);
    });

    describe('Institutions are changed or removed or added', () => {
      const was = {
        rows: [],
      };
      const now = {
        rows: [
          { iid: 'A', name: 'A' },
          { iid: 'C', name: 'X' },
          { iid: 'D', name: 'D' },
        ],
      };

      it('returns true', () => expect(hasAddedInstitutions(was, now)).to.be.true);
    });
  });
});
