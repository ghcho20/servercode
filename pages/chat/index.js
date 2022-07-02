import Chart from '../../components/Chart'

export default function Dashboard({ baseUrl, dashboardId }) {
  return (
    <div className='flex h-screen w-full justify-center items-center'>
      <Chart baseUrl={baseUrl} dashboardId={dashboardId}/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const baseUrl = process.env.CHART_BASE_URI
  const dashboardId = process.env.CHART_DASHBOARD_ID

  return {
    props: {
      baseUrl,
      dashboardId
    },
  };
}