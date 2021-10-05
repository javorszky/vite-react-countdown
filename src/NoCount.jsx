function NoCount(props) {
    return (
        <>
            <p className="final-countdown"><span className="minute">{props.cdMinute}</span><span className="cdMinuteColon">:</span><span className="cdSecond">{props.cdSecond}</span><span className="cdSecondColon">:</span><span className="cdMs">{props.cdMs}</span></p>
        </>
    )
}

export default NoCount