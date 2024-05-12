export const serviceRequestRowConfig = () => {

    const serviceState = (serviceState) => {

        let stateToShow;

        switch (serviceState) {

            case 'PA' : {
                stateToShow = 'POR AGENDAR'
                break
            }

            case 'AG' : {
                stateToShow = 'AGENDADO'
                break
            }

            case 'AT' : {
                stateToShow = 'ATENDIDO'
                break
            }

            case 'NF' : {
                stateToShow = 'NO FINALIZADO'
                break
            }

            case 'FN' : {
                stateToShow = 'FINALIZADO'
                break
            }
        }

        return stateToShow

    }

    const progressColor = (serviceProgress) => {

        let color;

        if (Number(serviceProgress) === 100){
            color = '#3ab916'
        }

        if (Number(serviceProgress) === 20){
            color  = '#E7B214FF'
        }

        if (Number(serviceProgress) > 20 && Number(serviceProgress) < 100){
            color  = '#0f67b9'
        }

        return color;
    }

    return {
        serviceState,
        progressColor
    }
}