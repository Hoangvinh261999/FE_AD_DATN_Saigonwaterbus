

function AmountStats({title, amount}){
    return(
        <div className="stats bg-base-100 shadow m-5 text-center">
            <div className="stat">
                <div className="stat-title">{title}</div>
                <div className="stat-value">{amount}</div>
            </div>
        </div>
    )
}

export default AmountStats;