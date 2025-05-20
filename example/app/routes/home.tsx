import type { Route } from "./+types/home";
import { PageConsumer, PageProvider, Page } from '@devgateway/wp-react-lib';
import ResponsiveContainer from "@devgateway/dvz-ui-react/layout";
import { useParams } from "react-router";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Home = () => {
  const params = useParams();
  const locale = params.lan ?? "en";

  return (
    <PageProvider
      slug={"home"}
      locale={locale}
      store={"home"}>
      <PageConsumer>
        <ResponsiveContainer locale={locale}>
          <PageConsumer>
            <Page />
          </PageConsumer>
        </ResponsiveContainer>
      </PageConsumer>
    </PageProvider>
  )
};

export default Home;