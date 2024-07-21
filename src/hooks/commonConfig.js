export const commonConfig = () => {

    const statusConfig = (status) => {

        let stateToShow;

        switch (status) {

            case 'NE' : {
                stateToShow = 'POR ENVIAR'
                break
            }

            case 'EN' : {
                stateToShow = 'ENVIADA'
                break
            }

        }

        return stateToShow

    }

    const progressColor = (status) => {

        let color;

        switch (status) {

            case 'NE' : {
                color = '#E7B214FF'
                break
            }

            case 'EN' : {
                color = '#3ab916'
                break
            }
        }

        return color;
    }

    const capitalizeString = (string) => {
        return string.charAt(0) + string.slice(1).toLowerCase();
    }

    const formatTimeStamp = (timeStamp) => {
        return `${timeStamp.split('T')[0]} • ${timeStamp.split('T')[1]}`
    }

    const formatListBoxIcon = (string) => {
        return string.charAt(0).toUpperCase()
    }

    const formatPriceToCurrency = (price) => {
        return new Intl.NumberFormat('es-CO',{
            style: 'currency', currency: 'COP' }).format(Number(price))
    }

    return {
        statusConfig,
        progressColor,
        capitalizeString,
        formatTimeStamp,
        formatListBoxIcon,
        formatPriceToCurrency
    }
}