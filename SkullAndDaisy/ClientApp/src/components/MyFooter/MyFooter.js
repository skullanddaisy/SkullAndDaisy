import React from 'react';
import './MyFooter.scss';



class MyFooter extends React.Component {
    
    
    render() {
        const sadText = "-------------- Skull and Daisy --------------";
        return(
            <footer className="footer">
                <div className="footerContent">
                    <span class="footerText">{sadText}</span>
                </div>
            </footer>
        )
    }
}



export default MyFooter;