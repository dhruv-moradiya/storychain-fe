import { SubmitRequest, SubmitRequestTable } from './submit-request-section';

const SubmitRequestSection = () => {
  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <SubmitRequestTable />
      <SubmitRequest onClose={() => {}} />
    </section>
  );
};

export default SubmitRequestSection;
