import {BananalottoClient, Credentials, User} from 'bananalotto-client';
import {Command} from 'commander';
import inquirer from 'inquirer';
import {KingolotoClient} from 'kingoloto-client';

export class App {
    protected credential = new Credentials();
    protected game: string;
    protected client: BananalottoClient;
    protected bananalotto = 'Bananalotto';
    protected kingoloto = 'Kingoloto';

    constructor(program: Command) {
        this.start(program);
    }

    protected start(program: Command = null) {
        this.askForCredentials(program)
            .then(() => {
                (this.game === this.bananalotto ? BananalottoClient : KingolotoClient).init(this.credential)
                    .then((client: BananalottoClient) => {
                        this.client = client;
                        this.startApplication();
                    })
                    .catch((err) => {
                        console.log('wrong login information, please try again');
                        this.restart();
                    });
            })
            .catch((err) => console.log(err));
    }

    protected restart() {
        this.credential = new Credentials();
        this.start();
    }

    protected askForCredentials(program: Command = null) {
        const game = new Promise(((resolve) => {
            if (program !== null && program.game) {
                this.game = program.user;
                resolve();
            } else {
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'menu',
                        message: 'Which game you want to play ?',
                        choices: [this.bananalotto, this.kingoloto],
                    })
                    .then((response) => {
                        this.game = response.menu;
                        resolve();
                    });
            }
        }));
        const email = game.then(() => {
            return new Promise(((resolve) => {
                if (program !== null && program.user) {
                    this.credential.email = program.user;
                    resolve();
                } else {
                    inquirer
                        .prompt({
                            message: 'Email :',
                            name: 'email',
                            type: 'text',
                        })
                        .then((response) => {
                            this.credential.email = response.email;
                            resolve();
                        });
                }
            }));
        });

        return email.then(() => {
            return new Promise(((resolve) => {
                if (program !== null && program.password) {
                    this.credential.password = program.password;
                    resolve();
                } else {
                    inquirer
                        .prompt({
                            message: 'Password :',
                            name: 'password',
                            type: 'password',
                        })
                        .then((response) => {
                            this.credential.password = response.password;
                            resolve();
                        });
                }
            }));
        });
    }

    protected startApplication() {
        const userInformation = 'Credentials Information';
        const play = 'Play one grid';
        const playAll = 'Play all grids';
        const switchGame = 'Switch game';
        const quit = 'Quit';
        inquirer
            .prompt({
                type: 'list',
                name: 'menu',
                message: 'What do you want to do ?',
                choices: [userInformation, play, playAll, quit],
            })
            .then((response) => {
                switch (response.menu) {
                    case userInformation:
                        this.client.userInformation().then((user: User) => {
                            console.log(user);
                            this.startApplication();
                        }).catch((reason) => {
                            console.log('error sorry !');
                        });
                        break;
                    case play:
                        this.playOne();
                        break;
                    case playAll:
                        this.playAll();
                        break;
                    case switchGame:
                        this.restart();
                        break;
                    case quit: break;
                }
            });
    }

    protected playOne() {
        this.client.userInformation().then((user: User) => {
            if (user.canPlay) {
                this.client.fetchGrid().then(() => {
                    this.client.postGrid().then(() => {
                        this.startApplication();
                    });
                });
            } else {
                console.log('all grid already play');
                this.startApplication();
            }
        });
    }

    protected playAll() {
        this.client.userInformation().then((user: User) => {
            if (user.canPlay) {
                this.client.fetchGrid().then(() => {
                    this.client.postGrid().then(() => {
                        this.playAll();
                    });
                });
            } else {
                console.log('all grid already play');
                this.startApplication();
            }
        });
    }
}
