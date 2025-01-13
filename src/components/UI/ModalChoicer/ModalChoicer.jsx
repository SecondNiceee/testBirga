import * as React from "react";
import PropTypes from "prop-types";
import { Option as  optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import cl from "./ModalChoicer.module.css"
import { CSSTransition } from "react-transition-group";

export default function ModalChoicer({
  values,
  className,
  names,
  setValue,
  defaultValue,
  ...props
}) {

  const [isOpen , setOpen] = React.useState(false)
  const clickHandler = React.useCallback( () => {
    if (isOpen){
      setOpen(false)
    }
    else{
      setOpen(true)
    }
  } , [isOpen , setOpen] )

  const [name, setName] = React.useState(names[values.indexOf(defaultValue)])


  // const style = React.useMemo( () => {
  //   if (isOpen){
  //     return {
  //       transition : "0.3s"
  //     }
  //   }
  //   return {
  //     transition : "0.3s"
  //   }
  // } , [isOpen] )


  React.useEffect( () => {
    
    function closeFunction(e){
        if (!e.target.closest(".list-box") && !(e.target.closest(".custom-button"))){
          setOpen(false)
        }
      
    }
    document.documentElement.addEventListener("touchstart" , closeFunction)
    return () =>{

      document.documentElement.removeEventListener("touchstart", closeFunction)
    }
    } , [] )

  return (
    <div {...props} className={cl.modalWrapper}>
        <CustomButton className = "custom-button"  onClick = {clickHandler} >{name}</CustomButton>


        <CSSTransition in = {isOpen}
        timeout={0}
        
        classNames={"show-modal"}
         >

                      <AnimatedListbox className = "list-box"  >

                          {values.map((e, i) => {
                            return (
                              <Option
                              className = {names[i] === name ? "base--selected" : ""}
                              style={values.length === 1 ? {borderRadius : "12px", } : {}}
                              onClick={() => {
                                
                                setValue(values[i])
                                setOpen(false)
                                setName(names[i])
                                
                              }} key={i} value={e}>
                                {names[i]}
                              </Option>
                            );
                          })}

                      </AnimatedListbox>



        </CSSTransition>
    </div>

  );
}




const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}

      <svg
        width="11"
        height="13"
        viewBox="0 0 11 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.36086 0.000976562C5.14813 0.000976562 4.96199 0.100693 4.74262 0.273536L0.255358 3.90323C0.0958106 4.03619 -0.00390625 4.23562 -0.00390625 4.48159C-0.00390625 4.93364 0.361722 5.26603 0.780533 5.26603C0.973319 5.26603 1.16611 5.1929 1.35889 5.04L5.36751 1.80918L9.36948 5.04C9.55562 5.1929 9.75505 5.26603 9.94784 5.26603C10.3666 5.26603 10.7323 4.93364 10.7323 4.48159C10.7323 4.23562 10.6326 4.03619 10.473 3.90323L5.97911 0.273536C5.76638 0.100693 5.58024 0.000976562 5.36086 0.000976562ZM5.36086 12.3193C5.58024 12.3193 5.76638 12.2263 5.97911 12.0534L10.473 8.42373C10.6326 8.28413 10.7323 8.08469 10.7323 7.84537C10.7323 7.38667 10.3666 7.05428 9.94784 7.05428C9.75505 7.05428 9.55562 7.13406 9.36948 7.28696L5.36751 10.5178L1.35889 7.28696C1.16611 7.13406 0.973319 7.05428 0.780533 7.05428C0.361722 7.05428 -0.00390625 7.38667 -0.00390625 7.84537C-0.00390625 8.08469 0.0958106 8.28413 0.255358 8.42373L4.74262 12.0468C4.96199 12.2263 5.14813 12.3193 5.36086 12.3193Z"
          fill="#2EA5FF"
        />
      </svg>
    </StyledButton>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
    position : relative;
    z-index : 300;
    align-items : center;
    display : flex;
    gap : 4px;
    padding : 0px;
    font-family: "SF Pro Display";
    font-weight: 400;
    letter-spacing: 0.02em;
    text-align: right;
    color: #2ea5ff;
    background-color : transparent;
    border : none;
    font-size: 16px;
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  opacity : 0;
  scale : 0;
  transition : all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1) 0s;
  transform-origin : right top;
  border-radius: 12px ;
  top: 25px;
  right: -7px;
  position : absolute;
  z-index : 2200;  
  backdrop-filter: blur(80px);
  box-shadow: 0 8px 84px 0 rgba(0, 0, 0, 0.1);
  display : flex;
  flex-direction : column;
  max-width : 190px;
  webkit-backdrop-filter: blur(100px);
  box-shadow: 0 4px 48px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0 ,50%);
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {

  return (

      <Listbox {...props} ref={ref} >
        {props.children}
        </Listbox>

  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const Option = styled("li")(
  ({ theme }) => `

  display : flex;
  position : relative;
  font-family: "SF Pro Text 400";
  font-weight: 400;
  font-size: 17px;
  line-height: 129%;
  letter-spacing: -0.02em;
  color: white;


  list-style: none;
  
  padding: 11px 16px;
  width: 190px;


  border-bottom: 0.64px solid rgba(54, 54, 54, 0.65);
  padding: 11px 20px;


  &:nth-child(1){
    border-radius: 12px 12px 0px 0px ;
  }
  &:last-of-type {
    border-radius: 0px 0px 12px 12px ;
    border-bottom: none;
  }

  &.${optionClasses.selected} {
  }

  &.${optionClasses.highlighted} {
    background-color: red;
  }

  &:focus-visible {
    outline: 3px solid ${blue[600]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
   
     background-color: transparent;
    position : relative;
  }

  &.${optionClasses.disabled} {
    color: ${grey[700]};
  }

  &:hover:not(.${optionClasses.disabled}) {
      background: #32373c;
  }
  `
);
