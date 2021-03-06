import Layout from "../components/layout";
import Link from "next/link";
import { dataProvider } from "../services/dataProvider";
import pagination from "../services/pagination";
import ProductBox from "../components/ui/productbox";
import HeroLinks from "../components/ui/herolinks";
import PagesLink from "../components/ui/pageslinks";

const Web = props => {
  return (
    <Layout
      title="Libraries"
      desc="Libraries to halp you make and grow your next app"
    >
      <div className="hero-build">
        <span className="badge">List</span>
        <HeroLinks title="Libraries" ></HeroLinks>
      </div>
      <div className="frame-def">
        {props.items.map(item => (
          <ProductBox item={item} key={item.link} />
        ))}
      </div>
      <PagesLink tabPages={props.tabPages} pageNbr={props.pageNbr}></PagesLink>
    </Layout>
  );
};

Web.getInitialProps = async function(context) {
  let provider = new dataProvider();
  let paginator = new pagination();

  var { type, p } = context.query;

  let result = provider.getByType("lib", p ? p : 0);
  let pages = paginator.paginateBy(result.nbr, 9);

  // Return to render
  return {
    items: result.result.map(entry => entry),
    pageNbr: p,
    tabPages: pages
  };
};

export default Web;
