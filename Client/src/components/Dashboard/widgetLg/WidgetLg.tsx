import "./widgetLg.css"

export default function WidgetLg() {

  const Button = ({type}:any) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="widgetLg">
        <h3 className="widgetLgTitle">Últimos Informes</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Clientes</th>
            <th className="widgetLgTh">Fecha</th>
            <th className="widgetLgTh">Cantidad</th>
            <th className="widgetLgTh">Estado</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgFecha">2 Jun 2022</td>
            <td className="widgetLgCantidad">$122.0</td>
            <td className="widgetLgEstado"><Button type="Aprobado"/>
            </td>                        
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgFecha">2 Jun 2022</td>
            <td className="widgetLgCantidad">$122.0</td>
            <td className="widgetLgEstado"><Button type="Rechazado"/>
            </td>                        
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgFecha">2 Jun 2022</td>
            <td className="widgetLgCantidad">$122.0</td>
            <td className="widgetLgEstado"><Button type="Pendiente"/>
            </td>                        
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgUser">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
              <span className="widgetLgName">Susan Carol</span>
            </td>
            <td className="widgetLgFecha">2 Jun 2022</td>
            <td className="widgetLgCantidad">$122.0</td>
            <td className="widgetLgEstado"><Button type="Aprobado"/>
            </td>                        
          </tr>
        </table>
    </div>    
  )
}




{/* <td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Declined"/>
</td>      
<td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Pending"/>
</td> 
<td className="widgetLgUser">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetLgImg" />
<span className="widgetLgName">Susan Carol</span>
</td>
<td className="widgetLgFecha">2 Jun 2022</td>
<td className="widgetLgCantidad">$122.0</td>
<td className="widgetLgEstado"><Button type="Approved"/>
</td>      */}