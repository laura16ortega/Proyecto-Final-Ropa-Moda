import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material" 

export default function FeaturedInfo() {
  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle">Ingresos</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,415</span>
                <span className="featuredMoneyRate">-11.5  
                <ArrowDownward className="featuredIcon negative"/>
                </span>
            </div>
            <span className="featuredSub">En comparación con el mes pasado</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Ventas</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$4,415</span>
                <span className="featuredMoneyRate">-1.5 
                <ArrowDownward className="featuredIcon negative"/>
                </span>
            </div>
            <span className="featuredSub">En comparación con el mes pasado</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Costo</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$2,225</span>
                <span className="featuredMoneyRate">+2.5 
                <ArrowUpward className="featuredIcon"/>
                </span>
            </div>
            <span className="featuredSub">En comparación con el mes pasado</span>
        </div>
    </div>
  )
}
