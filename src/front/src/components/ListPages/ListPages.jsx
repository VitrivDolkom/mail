import "./style.css";
import { useContext } from "react";

import ToPage from "../ToPage/ToPage";
import archive from '../../img/archive.svg';
import drafts from '../../img/drafts.svg';
import incoming from '../../img/incoming.svg';
import outcoming from '../../img/outcoming.svg';
import spam from '../../img/spam.svg';
import trash from '../../img/trash.svg';
import important from '../../img/important.svg';


import archiveD from '../../img/dark/archive.svg';
import draftsD from '../../img/dark/drafts.svg';
import incomingD from '../../img/dark/incoming.svg';
import outcomingD from '../../img/dark/outcoming.svg';
import spamD from '../../img/dark/spam.svg';
import trashD from '../../img/dark/trash.svg';
import importantD from '../../img/dark/important.svg';
import ThemeContext from "../../context/Theme";



const ListPages = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <ul className="listPages">
            {theme ?
                (
                    <>
                        <ToPage title={'Входящие'} imageSrc={incoming} link='incoming' />
                        <ToPage title={'Важное'} imageSrc={important} link='important' />
                        <ToPage title={'Отправленные'} imageSrc={outcoming} link='outcoming' />
                        <ToPage title={'Черновики'} imageSrc={drafts} link='drafts' />
                        <ToPage title={'Архив'} imageSrc={archive} link='archive' />
                        <ToPage title={'Спам'} imageSrc={spam} link='spam' />
                        <ToPage title={'Корзина'} imageSrc={trash} link='trash' /></>)
                :
                (
                    <>
                        <ToPage title={'Входящие'} imageSrc={incomingD} link='incoming' />
                        <ToPage title={'Важное'} imageSrc={importantD} link='important' />
                        <ToPage title={'Отправленные'} imageSrc={outcomingD} link='outcoming' />
                        <ToPage title={'Черновики'} imageSrc={draftsD} link='drafts' />
                        <ToPage title={'Архив'} imageSrc={archiveD} link='archive' />
                        <ToPage title={'Спам'} imageSrc={spamD} link='spam' />
                        <ToPage title={'Корзина'} imageSrc={trashD} link='trash' /></>)
            }


        </ul>
    );
}

export default ListPages;