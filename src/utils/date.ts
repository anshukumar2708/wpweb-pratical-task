import dayjs from "dayjs"

export const formatDate = (date: string | number | Date | dayjs.Dayjs, format: string): string => {
    return dayjs(date).format(format);
  };


  export const getCurrentUTCTime = (
    date = new Date().toISOString(),
    format = ""
  ): string => {
    return dayjs(date).format(format);
  };