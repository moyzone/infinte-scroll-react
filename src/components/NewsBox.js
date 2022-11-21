import React from 'react'
import './NewsBox.css'

const NewsBox=(props)=>{

    const dateConv=(dt)=>{
        let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(dt);
        let finalDate=d.getMonth() + " "+ d.getDate() +" "+d.getFullYear() + " " +d.getTime() + " " + d.getTimezoneOffset();
        console.log(d.getUTCDate())
        return d.toLocaleString();
    }
    return(        
        <div>
            <div class="container">
                <div class="pic_container">
                    <img src={props.newsItem.node.field_photo_image_section} />
                </div>
                <div class="content_container">
                    <div class="content">
                        {props.newsItem.node.title}
                    </div>
                    <div class="upload_date">
                        {dateConv(props.newsItem.node.last_update)}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewsBox;