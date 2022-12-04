
import incoming from '../img/incoming.svg';
import important from '../img/important.svg';
import outcoming from '../img/outcoming.svg';
import drafts from '../img/drafts.svg';
import archive from '../img/archive.svg';
import spam from '../img/spam.svg';
import trash from '../img/trash.svg';


import archiveD from '../img/dark/archive.svg';
import draftsD from '../img/dark/drafts.svg';
import incomingD from '../img/dark/incoming.svg';
import outcomingD from '../img/dark/outcoming.svg';
import spamD from '../img/dark/spam.svg';
import trashD from '../img/dark/trash.svg';
import importantD from '../img/dark/important.svg';


let state = {
    sidebar: {
        listPages: [
            { title: 'Входящие', img: incoming, imgDark: incomingD, to: "in" },
            { title: 'Важное', img: important, imgDark: importantD, to: "imp" },
            { title: 'Отправленные', img: outcoming, imgDark: outcomingD, to: "out" },
            { title: 'Черновики', img: drafts, imgDark: draftsD, to: "draft" },
            { title: 'Архив', img: archive, imgDark: archiveD, to: "arc" },
            { title: 'Спам', img: spam, imgDark: spamD, to: "spam" },
            { title: 'Корзина', img: trash, imgDark: trashD, to: "trash" }
        ]
    }


}


export default state;