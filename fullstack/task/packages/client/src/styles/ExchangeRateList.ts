import styled from 'styled-components';

const LIGHT_GREY = '#efefef';
const DARK_GREY = '#ddd';

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
    border: 1px solid ${DARK_GREY};
`;

export const GridHeader = styled.div`
    border: 1px solid ${DARK_GREY};
    background-color: ${DARK_GREY};
    font-weight: 700;
`;

export const GridData = styled('div')<{ textAlign: string }>`
    border: 1px solid ${DARK_GREY};
    padding: 3px;
    ${(props) => `text-align: ${props.textAlign};`};
    &:nth-child(10n + 1),
    &:nth-child(10n + 2),
    &:nth-child(10n + 3),
    &:nth-child(10n + 4),
    &:nth-child(10n + 5) {
        background-color: ${LIGHT_GREY};
    }
`;
