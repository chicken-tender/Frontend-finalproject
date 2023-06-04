import styled from '@emotion/styled';

export const ColumnWrapper = styled.div(
  props => ({
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: props.gap || '',
    width: props.width || '100%',
    '@media screen and (max-width:768px)': {
      width: props.responsiveWidth || '80%',
    },
    alignItems: props.alignItems || '',
    justifyContent: props.justifyContent || '',
  })
);

export const RowWrapper = styled.div(
  props => ({
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '@media screen and (max-width:768px)': {
      width: '80%',
    },
    gap: props.gap || '',
  })
);