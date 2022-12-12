import "./widgetSm.css"
import {Visibility} from '@mui/icons-material'

export default function WidgetSm() {
  return (
    <div className="widgetSm">
        <span className="widgetSmTitle">Nuevos Miembros</span>
        <ul className="widgetSmList">
            <li className="widgetSmListItem">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUserName">Hellen Keller</span>
                    <span className="widgetSmUserTitle">software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility/>
                    Display
                </button>
                
            </li>
            <li className="widgetSmListItem">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUserName">Hellen Keller</span>
                    <span className="widgetSmUserTitle">software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUserName">Hellen Keller</span>
                    <span className="widgetSmUserTitle">software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUserName">Hellen Keller</span>
                    <span className="widgetSmUserTitle">software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility/>
                    Display
                </button>
            </li>
            <li className="widgetSmListItem">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST5jf6IJvuPMKWml4G6yeIYswrQVIbKRvShg&usqp=CAU" alt="" className="widgetSmImg" />
                <div className="widgetSmUser">
                    <span className="widgetSmUserName">Hellen Keller</span>
                    <span className="widgetSmUserTitle">software Engineer</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Display
                </button>
            </li>
        </ul>
    </div>
  )
}
