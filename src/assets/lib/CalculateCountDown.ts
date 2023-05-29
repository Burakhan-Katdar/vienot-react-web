import { useTranslation } from "react-i18next"

export const WhichTimezoneYouAreIn = (timezoneNumber: number) => {
    //return is positive means you are in UTC-x hours.
    //return is negative means you are in UTC+x hours.
    //gelen sonucu - ile çarpıp öyle işlem ypamalıyız.
    return timezoneNumber / 60;
}

//Serverdan gelen tempCompetitionEndDate verisi gmt0 olarak geliyor. Bizim ilgili saat farkını eklmememiz lazım.
export default function CalculateCountDown(tempCompetitionEndDate: string) {
    let hourDifference = WhichTimezoneYouAreIn(new Date().getTimezoneOffset())
    let dateNow = new Date(new Date().setHours(new Date().getHours()));
    let dateObjectCompetitionEndDate = new Date(tempCompetitionEndDate)

    let differenceInTimeStamp = (dateObjectCompetitionEndDate.getTime() + (-hourDifference * 60 * 60 * 1000)) - dateNow.getTime();
    let differenceInDays = Math.ceil(differenceInTimeStamp / (1000 * 3600 * 24));
    let differenceInHours = Math.ceil(differenceInTimeStamp / (1000 * 3600));
    let differenceInMinutes = Math.ceil(differenceInTimeStamp / (1000 * 3600) * 60)

    const { t } = useTranslation();

    if (differenceInDays > 2) {
        return {
            text: (differenceInDays.toString() + ' ' + t('DaysLeft')),
            timestamp: differenceInTimeStamp
        }
    }
    else if (differenceInHours > 2) {
        return {
            text: (differenceInHours.toString() + ' ' + t('HoursLeft')),
            timestamp: differenceInTimeStamp
        }
    }
    else if (differenceInMinutes > 0) {
        return {
            text: (differenceInMinutes.toString() + ' ' + t('MinutesLeft')),
            timestamp: differenceInTimeStamp
        }
    }
    else {
        return {
            text: t('Expired'),
            timestamp: differenceInTimeStamp
        }
    }
}