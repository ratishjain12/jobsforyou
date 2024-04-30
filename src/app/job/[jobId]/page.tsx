const JobDetails = ({ params }: { params: { jobId: number } }) => {
  return <div>{params.jobId}</div>;
};
export default JobDetails;
