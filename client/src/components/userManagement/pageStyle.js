import styled from 'styled-components';

const PageStyle = styled.div`
.downloadContainer, .uploadContainer {
    height: 15vh;
    background-color: #e5e5e5;
    text-align: center;
    margin: 0 0 20px 0;
    padding: 5.4vh;
}

.userListSearch {
    margin: 10px;
    width: 90%;
}

.filterContainer {
    text-align: center;
    position: relative;
    top: 7px;
    float: right;
    cursor: pointer;
}

.searchLabelContainer {
    margin-bottom: 15px;
    margin: 10px;
    padding: 0 10px;
}

.indegeneCard .ant-card-body .right {
    margin: 0 0 10px 0;
}

.actionButtons {
    margin: 0 5px 0 0;
}

`;

export default PageStyle;