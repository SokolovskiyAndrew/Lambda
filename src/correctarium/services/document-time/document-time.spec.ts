import { getDocumentExecutionTime } from './document-time';

describe('getDocumentExecutionTime', () => {
  describe('Set due date based on time when task was added', () => {
    it('should set deadline for today if task was added on schedule and the overall time is less than 9 hours', () => {
      //31.05 - 10:30 - Tuesday
      const lWorkingHours = 1653982200000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(2000, 'en', true, lWorkingHours);

      expect(lEstimatedDateInfo.deadline_date).toEqual('31/05/2022 17:00:22');
    });

    it('should set dead line for today if task was added on before hours and the overall time is less than 9 hours', () => {
      //31.05 - 9:30 - Tuesday
      const lBeforeWorkingHours = 1653978600000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(2000, 'en', true, lBeforeWorkingHours);

      expect(lEstimatedDateInfo.deadline_date).toEqual('31/05/2022 16:30:22');
    });

    it('should set dead line for next day if task was added on after hours and the overall time is less than 9 hours', () => {
      //31.05 - 19:30 - Tuesday
      const lAfterWorkingHours = 1654014600000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(2000, 'en', true, lAfterWorkingHours);

      expect(lEstimatedDateInfo.deadline_date).toEqual('01/06/2022 16:30:22');
    });

    it('should set dead line for next Monday if task was added on after hours and next day is weekend and the overall time is less than 9 hours', () => {
      //31.05 - 9:30 - Tuesday
      const lAfterWorkingHours = 1653669000000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(2000, 'en', true, lAfterWorkingHours);

      expect(lEstimatedDateInfo.deadline_date).toEqual('30/05/2022 16:30:22');
    });
  });

  describe('estimated hours', () => {
    it('should estimate task completion time for one hour if there is work for less than one hour', () => {
      //31.05 - 9:30 - Tuesday
      const lBeforeWorkingHours = 1653978600000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(450, 'en', true, lBeforeWorkingHours);

      expect(lEstimatedDateInfo.time).toEqual(1);
    });

    it('should calculate completion time with take into account 20% if document type is not supported', () => {
      //31.05 - 9:30 - Tuesday
      const lBeforeWorkingHours = 1653978600000;
      // 2000 chars will take around 7 hours to complete
      const lEstimatedDateInfo = getDocumentExecutionTime(450, 'en', false, lBeforeWorkingHours);

      expect(lEstimatedDateInfo.time).toEqual(2);
    });
  });
});
