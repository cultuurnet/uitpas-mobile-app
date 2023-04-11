import React from 'react'
import { Trans as TransI18n, TransProps } from "react-i18next";
import { TFuncKey } from 'i18next';

import Typography from '../typography/Typography';


const Trans = <
  K extends TFuncKey<N, TKPrefix> extends infer A ? A : never,
  N extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<N> = undefined,
  E = React.HTMLProps<HTMLDivElement>
>(props: TransProps<K, N, TKPrefix, E>) => {
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