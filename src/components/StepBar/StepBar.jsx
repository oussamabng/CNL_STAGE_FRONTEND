import React,{useState,useEffect} from 'react';

//? import css
import "./StepBar.css";

const Step = (props)=>{
    const {title,active} = props;
    return (
        <div className="step">
            <div className={active?"icon_step active":"icon_step"}>
                <div className="line"></div>
                <div className="circle">
                    <div className="under_circle"></div>
                </div>
            </div>
            <div className={active?"text active":"text"}>
                <p>{title}</p>
                {active && <div className="line_text"></div>}
            </div>
        </div>
    )
}

export default function StepBar(props) {
    const {isDate} = props;
    const [activeStep,setActiveStep] = useState("init");
    useEffect(()=>{
        //TODO request for getting status project;
    });
    return (
        <div className="step_bar">
            <div className="steps">
            <div className="text">
                <p style={{
                    color:activeStep==="init"?"#0E4D90":"#707070"
                }} >Initialisation</p>
            </div>
            <Step title="Étape 1" active={activeStep === "etape1"} />
            <Step title="Étape 2" active={activeStep === "etape2"} />
            <Step title="Étape 3" active={activeStep === "etape3"} />
            <Step title="Étape 4" active={activeStep === "etape4"} />
            <Step title="Étape 5" active={activeStep === "etape5"} />
            <Step title="Étape 6" active={activeStep === "etape6"} />
            <Step title="Étape 7" active={activeStep === "etape6"} />
            </div>
        </div>
    )
}
