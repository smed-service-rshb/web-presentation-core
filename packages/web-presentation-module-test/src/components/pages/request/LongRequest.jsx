import React from 'react';
import {
    actionWithoutPreloader,
    compose,
    withActions,
    withFormData,
    withModals,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import {Button, Form, Panel, withPreloader} from '@efr/medservice-web-presentation-ui';
import {GetError} from "../../../actions/index";

class LongRequest extends React.Component {

    handleReq = code => () => (
        this.props.actions.getError(code)
            .then(res => {
                console.log(res);
                return res
            })
            .catch(err => {
                console.error(err);
                throw err;
            })
    );

    handleLongReqWithoutPreloader = () => (
        this.props.actions.getErrorWithoutPreloader(200)
            .then(res => {
                console.log(res);
                this.props.modals.alert({message: "Запрос завершен"});
                return res
            })
            .catch(err => {
                console.error(err);
                this.props.modals.alert({message: "Запрос завершен с ошибкой " + err});
                throw err;
            })

    );

    handleParallel = () => {
        this.handleReq(200)();
        this.handleReq(401)();
    };

    handleComposite = () => {
        this.handleReq(200)()
            .then(this.handleReq(401))
    };

    customError = () => {
        this.handleReq(200)()
            .then(() => this.qqq())//Такой функи нет. имитируем ошибку
    };

    withoutRequest = () => {
        this.props.preloader.show();
        setTimeout(this.props.preloader.hide, 5000)
    };

    render = () => {
        const fromButtons = [
            <Button key="longReq"
                    name="Долгий запрос"
                    dataId="button-long-req"
                    onClick={this.handleReq(200)}
            />,
            <Button key="longReqWithoutPreloader"
                    name="Долгий запрос (без прелоадера)"
                    dataId="button-long-req-without-preloader"
                    onClick={this.handleLongReqWithoutPreloader}
            />,
            <Button key="error"
                    name="Ошибка 401"
                    dataId="button-error"
                    onClick={this.handleReq(401)}
            />,
            <Button key="error500"
                    name="Ошибка 500"
                    dataId="button-error-500"
                    onClick={this.handleReq(500)}
            />,
            <Button key="composite"
                    name="Последовательный запрос"
                    dataId="button-composite"
                    onClick={this.handleComposite}
            />,

            <Button key="parallel"
                    name="Параллельный запрос"
                    dataId="button-composite"
                    onClick={this.handleParallel}
            />
            ,

            <Button key="custom.error"
                    name="Ошибка при обработке"
                    dataId="button-custom.error"
                    onClick={this.customError}
            />,

            <Button key="without.request"
                    name="Без запроса"
                    dataId="button-without.request"
                    onClick={this.withoutRequest}
            />
        ];

        return (
            <Panel label="MyTest" dataId="my-test-panel">
                <Form buttons={fromButtons} dataId="testForm"/>
            </Panel>
        )
    }
}

export default compose(
    withPageRouter,
    withFormData,
    withActions(
        {
            getError: GetError.name,
            getErrorWithoutPreloader: actionWithoutPreloader(GetError.name)
        }
    ),
    withPreloader,
    withModals()
)(LongRequest)