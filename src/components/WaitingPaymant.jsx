import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {actionCancelFinana, actionGetFinana, actionSendFinana} from "../redux/action/actionFinana";

import logo from '../img/logo.svg';
import error from '../img/error.svg';
import copyIcon from '../img/copy-icon.svg';

import './WaitingPayment.scss';

function format(s) {
  return s.toString().replace(/\d{4}(?=.)/g, '$& ');
}

const bankNames = {
  'Сбербанк RUB': 'Sberbank',
  'Банк Открытие RUB': 'Otkritie',
  'Промсвязьбанк RUB': 'PSB',
  'Росбанк RUB': 'Rosbank',
  'Райффайзен Банк RUB': 'Raiffeisen',
  'Хоум Кредит RUB': 'Homecredit',
  'Рокетбанк RUB': 'Rocketbank',
  'МТС Банк RUB': 'MTS',
  'Round Bank RUB': 'Roundbank',
  'Bank Saint Petersburg RUB': 'SPB',
  'QIWI Bank RUB': 'Qiwi',
  'Tinkoff RUB': 'Tinkoff',
  'Alfa-Bank RUB': 'Alfa',
  'ВТБ RUB': 'VTB',
  'MKB RUB': 'MKB',
  'Уралсиб RUB': 'Uralsib'
}

export const WaitingPayment = () => {
  const {finana} = useSelector(state => state.finana)
  const dispatch = useDispatch()
  const {search} = useLocation();
  const [timer, setTimer] = useState(null)
  const [active, setActive] = useState('')
  const [active1, setActive1] = useState('')
  const [modal, setModal] = useState(false)

  const id = search.split("?id=").pop()

  useEffect(() => {
    dispatch(actionGetFinana(id))
  }, [dispatch, id])

  useEffect(() => {
    if (!(Object.keys(finana).length && finana.resipient_card && finana.resipient_card)) {
      return
    }
    const x = setInterval(function () {
      const updated = Math.floor(new Date(finana.resipient_card.updated_at).getTime() / 1000)
      const current = Math.floor(new Date().getTime() / 1000)
      const sec_num = 600 - (current - updated)

      setTimer(sec_num)
      if (sec_num < 0) {
        clearInterval(x);
      }
    }, 1000);
  }, [finana])

  if (!(Object.keys(finana).length && finana.resipient_card && finana.resipient_card) || timer === null) {
    return
  }

  const renderTimer = (sec_num) => {
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60

    return `${minutes} мин ${seconds} сек`
  }

  const handleClick = (textState) => {
    if (active) {
      return
    }
    navigator.clipboard.writeText(textState)
    setActive('active')
    setTimeout(() => {
      setActive('')
    }, 2000)
  }

  const handleClick1 = (textState) => {
    if (active1) {
      return
    }
    navigator.clipboard.writeText(textState)
    setActive1('active')
    setTimeout(() => {
      setActive1('')
    }, 2000)
  }

  const handleSend = () => {
    dispatch(actionSendFinana(id))
  }

  const handleCancel = () => {
    dispatch(actionCancelFinana(id))
    handleModal(false)
  }

  const handleModal = (flag) => {
    setModal(flag)
  }

  return (
    <div className='waiting-payment-wrap'>
      {timer >= 0 && (finana.state === 'waiting_payment' || finana.state === 'paid') && <div className='waiting-payment'>
        <div className="waiting-payment__title">
          <img src={logo} alt=""/>
          <img onClick={() => handleModal(true)} src={error} alt=""/>
        </div>
        <div className="card">
          <div className="card__title">Запрос успешно принят</div>
          <div className="card__info">Сделайте перевод суммы на указанную карту</div>
          <div className={`card-block-wrap ${bankNames[finana.resipient_card.bank_name]} ${finana.resipient_card.brand}`}>
            <div className='card-block'>
              <div className="card-block__top">
                <div className="card-block__top-logo"/>
                <div className="card-block__top-payment"/>
              </div>
              <div className="card-block__bottom">
                <div className="number">
                  <div className="number__title">
                    Номер карты для перевода
                  </div>
                  <div className="number__block">
                    <div className="number__block--number">
                      {format(finana.resipient_card.number)}
                    </div>
                    <div className="copy">
                      <div className={`copy__text ${active}`}>
                        <span>Скопировано</span>
                        <span className="copy__text-arrow"/>
                      </div>
                      <div className="copy__img" onClick={() => handleClick(finana.resipient_card.number)}>
                        <img src={copyIcon} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="number number-sum">
                  <div className="number__title">
                    Сумма перевода
                  </div>
                  <div className="number__block">
                    <div className="number__block--number">
                      <span>{finana.amount}</span><span> ₽</span>
                    </div>
                    <div className="copy">
                      <div className={`copy__text ${active1}`}>
                        <span>Скопировано</span>
                        <span className="copy__text-arrow"/>
                      </div>
                      <div className="copy__img" onClick={() => handleClick1(finana.amount)}>
                        <img src={copyIcon} alt=""/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-block-fon"/>
            <div className="card-block-fon1"/>
          </div>
          <div className="card-bottom">
            <div className="card-bottom__timer">
              {renderTimer(timer)}
            </div>
            {finana.state !== 'paid' && <div className="card-bottom__wrap">
              <div className="card-bottom__info">
                Переводите строго точную сумму одним переводом!
              </div>
              <div className="card-bottom__send">
                <span>Если вы отправили средства - нажмите</span>
                <span> Я отправил</span>
              </div>
              <button
                className="card-bottom__btn"
                onClick={() => handleSend()}
              >Я отправил
              </button>
            </div>}
            {finana.state === 'paid' &&
              <div className='paid'>
                <p>Время было продлено до 10 минут для получение средств.<br/>
                  Система в данный момент ищет ваш перевод!</p>
                <div className="spinner"/>
                <div className="paid__search">ИЩЕМ ВАШ ПЕРЕВОД</div>
              </div>
            }
          </div>
        </div>
        {finana.state !== 'paid' &&
          <div className="card-info">Переводите точную сумму ОДНИМ ПЕРЕВОДОМ, или он не будет зачислен!!!</div>}
      </div>}
      {timer < 0 && (finana.state === 'waiting_payment' || finana.state === 'paid') &&
        <div className='waiting-payment-timeout'>
          <div className="waiting-payment-timeout__title">
            <img src={logo} alt=""/>
          </div>
          <div className="waiting-payment-timeout__content">
            <img src={error} alt=""/>
            <h2>Платеж не был получен</h2>
            <div>Истекло время оплаты</div>
            <button>Вернуться на сайт магазина</button>
          </div>
          <div className="waiting-payment-timeout__bottom">Я перевёл, но платёж не прошёл!</div>
        </div>
      }

      {finana.state === 'failed' &&
        <div className='WaitingPaymentTimeOut'>
          <div className="WaitingPaymentTimeOut__title">
            <img src={logo} alt=""/>
          </div>
          <div className="WaitingPaymentTimeOut__content">
            <img src={error} alt=""/>
            <h2>Платеж вами отклонён</h2>
            <div>Вы отменили платёж</div>
            <button>Вернуться на сайт магазина</button>
          </div>
        </div>
      }

      {modal && <div className="modal__wrap" onClick={() => handleModal(false)}>
        <div className='modal' onClick={(e) => {
          e.stopPropagation();
        }}>
          <h3>Подтвердите действие</h3>
          <img src={error} alt=""/>
          <div className='modal__text'>Отменить платеж?</div>
          <button className='modal__btn' onClick={() => handleCancel()}>Отменить</button>
          <div className='modal__cancel' onClick={() => handleModal(false)}>{`< `}&nbsp;&nbsp;Назад</div>
        </div>
      </div>}
    </div>
  );
}

