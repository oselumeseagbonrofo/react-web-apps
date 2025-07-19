export default function Tabs({buttons, children, ButtonsWrapper="menu"}){
    
    return(
        <>
        <ButtonsWrapper>
            {buttons}
        </ButtonsWrapper>
        {children}    
        </>
    )
}