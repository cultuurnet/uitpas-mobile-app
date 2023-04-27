import React from 'react'
import { Trans as TransI18n, TransProps } from "react-i18next";

import Typography, { TTypographyProps } from '../typography/Typography';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Trans = (props: TTypographyProps & TransProps<any>) => {
  return (
    <TransI18n
      components={{
        bold: (
          <Typography fontStyle='bold' />
        ),
      }}
      parent={Typography}
      {...props}
    />
  )
}

export default Trans;