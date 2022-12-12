import Chart from "../chart/Chart"
import FeaturedInfo from "../featuredInfo/FeaturedInfo"
import "./home.css"
import {userData} from "../../../dummyData";
import WidgetSm from "../widgetSm/WidgetSm";
import WidgetLg from "../widgetLg/WidgetLg";
import AllUsers from '../AllUsers/AllUsers';

const Home = () => {
    return (
      <div className="home">
          <FeaturedInfo/> 
          <Chart data={userData} title="Análisis de Usuarios" grid dataKey="Active User"/>
          <div className="homeWidgets">
            
            <WidgetSm/>
            <WidgetLg/>

          </div>
      </div>
    )
  }
  
export default Home


