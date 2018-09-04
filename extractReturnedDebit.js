const extractReturnedDebit = (data) => {
    let ReturnedDebitItem = data[0]
        .ARUDD[0]
        .Advice[0]
        .OriginatingAccountRecords[0]
        .OriginatingAccountRecord[0]
        .ReturnedDebitItem
    let singleItem = ReturnedDebitItem.map(item => {
        const {
            ref,
            transCode,
            returnCode,
            returnDescription,
            originalProcessingDate,
            valueOf,
            currency
        } = item.$
        const PayerAccountInfo = item.PayerAccount.map(items => {
            const {
              ref,
              number,
              name,
              sortCode,
              bankName,
              branchName
             } = items.$;
             return {
              ref,
              number,
              name,
              sortCode,
              bankName,
              branchName}
          })
        return {
            ref,
            transCode,
            returnCode,
            returnDescription,
            originalProcessingDate,
            valueOf,
            currency,
            PayerAccount: PayerAccountInfo
        }
    })
    return singleItem

    // return console.log('>>>', ReturnedDebitItem)
}

module.exports = extractReturnedDebit