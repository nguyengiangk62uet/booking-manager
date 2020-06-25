import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import { t } from 'helpers/i18n';

const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={t('PageNotFound')}
      extra={
        <Link to="/">
          <Button type="primary">{t('BackToHome')}</Button>
        </Link>
      }
    />
  );
};

export default Page404;
