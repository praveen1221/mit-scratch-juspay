import * as React from 'react';
import { SingleAction } from './singleAction';
import { Droppable } from 'react-beautiful-dnd';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Draggable1 from 'react-draggable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WARN_MSG_POS } from '../constants';

export const EventBody = (props) => {
    const {
        moves,
        setMoves,
        actions,
        setActions,
        setActions2,
        actions2
    } = props;

    const ref = React.useRef();
    const ref2 = React.useRef();

    const [swapState, setSwapState] = React.useState(false)

    React.useEffect(() => {
        if (!displayAddIcon) {
            runAction1();

            runAction2();

            alert('Collision Occured, Swapping the Motions');
        }

    }, [swapState])
    /// r, t values corresspond to right , top values  
    let r = '0%';
    let t = '0%';
    let scale = 1;
    let angle = 0;
    let r2 = '0%';
    let t2 = '0%';
    let scale2 = 1;
    let angle2 = 0;

    const [hello, setHello] = React.useState(false);
    const [displayAddIcon, setDisplayAddIcon] = React.useState(true);
    const [sprite, setSprite] = React.useState(require('../Assets/images/cat.png'));
    const [sprite2, setSprite2] = React.useState(null);


    function transform(temp, xAxis, action1) {
        let value = temp.toString();
        if (xAxis) {
            if (action1) {
                r = value.concat('%')
            } else {
                r2 = value.concat('%')
            }
        } else {
            if (action1) {
                t = value.concat('%')
            } else {
                t2 = value.concat('%')
            }
        }
        action1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
            : ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
    }

    function moveUp(i, action1) {
        //move up top - 100
        setTimeout(() => {
            let temp = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
            temp = temp - 100;
            if (temp < -140) {
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, false, action1);
        }, (i * 1500));
    }
    function moveDown(i, action1) {
        //move down top + 100    
        setTimeout(() => {
            let temp = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
            temp = temp + 100;
            if (temp > 140) {
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, false, action1);
        }, (i * 1500));
    }
    function moveRight(i, action1) {
        //move right right+100
        setTimeout(() => {
            let temp = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
            temp = temp + 100;
            if (temp > 290) {
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, true, action1);

        }, (i * 1500));
    }
    function moveLeft(i, action1) {
        //move right right-100 
        setTimeout(() => {
            let temp = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
            temp = temp - 100;
            if (temp < -290) {
                refresh(WARN_MSG_POS);
                return
            }
            transform(temp, true, action1);
        }, (i * 1500));
    }
    function moveXY(xInput, yInput, random, i, action1) {
        // combined function to move to random postion and to x, y cordinates  
        setTimeout(() => {
            let tempR = parseInt(action1 ? r.slice(0, -1) : r2.slice(0, -1));
            let tempT = parseInt(action1 ? t.slice(0, -1) : t2.slice(0, -1));
            // asign the x, y values 
            // or to random values 
            tempR = tempR !== parseInt(xInput) && parseInt(xInput) !== 0
                ? (random ? Math.floor((Math.random() * (-290 - 290)) + 290) : parseInt(xInput))
                : tempR;
            tempT = tempT !== (-parseInt(yInput)) && parseInt(yInput) !== 0
                ? (random ? Math.floor((Math.random() * (-140 - 140)) + 140) : -parseInt(yInput))
                : tempT;
            if (parseInt(yInput) == 0) {
                tempT = 0;
            }
            if (parseInt(xInput) == 0) {
                tempR = 0;
            }
            //return to intial if it is out of bounds 
            if (tempR < -290 || tempR > 290 || tempT < -140 || tempT > 140) {
                refresh(WARN_MSG_POS);
                return
            }
            let valueR = tempR.toString();
            let valueT = tempT.toString();

            if (action1) {
                r = valueR.concat('%');
                t = valueT.concat('%');
            } else {
                r2 = valueR.concat('%');
                t2 = valueT.concat('%');
            }
            // apply tarnsform for respective sprite
            action1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
                : ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
        }, (i * 1500));
    }
    const rotate = (rAngle, i, action1) => {
        setTimeout(() => {
            //rotate the sprite 
            action1 ? angle += rAngle : angle2 += rAngle;
            // apply tarnsform for respective sprite
            action1 ? ref.current.style.transform = `scale(${scale})translate(${r}, ${t}) rotate(${angle}deg)`
                : ref2.current.style.transform = `scale(${scale2})translate(${r2}, ${t2}) rotate(${angle2}deg)`;
        }, (i * 1500));
    }

    const startActions = (action, idx, action1) => {
        switch (action) {
            case 'move x by 100': {
                moveRight(idx, action1);
                break;
            }
            case 'move y by 100': {
                moveUp(idx, action1);
                break;
            }
            case 'move x by -100': {
                moveLeft(idx, action1);
                break;
            }
            case 'move y by -100': {
                moveDown(idx, action1);
                break;
            }
            case 'rotate 45': {
                rotate(45, idx, action1);
                break;
            }
            case 'rotate 360': {
                rotate(360, idx, action1);
                break;
            }
            case 'move (0, 0)': {
                moveXY(0, 0, false, idx, action1);
                break;
            }
            case 'repeat': {
                setTimeout(() => {
                    if (action1) {
                        runAction1();
                    } else {
                        runAction2();
                    }
                }, idx * 1500);
                break;
            }
            default: break;
        }

        if (detectCollision(ref.current, ref2.current)) {
            swapAnimations();
            setSwapState(true)
        }
    };

    function clearTimeouts() {
        var highestTimeoutId = setTimeout(";");
        for (var i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }
    }

    const refresh = (msg) => {
        //refresh to intial positions 
        r = '0%';
        t = '0%';
        r2 = '0%';
        t2 = '0%';
        scale2 = 1;
        angle2 = 0;
        scale = 1;
        angle = 0;
        clearTimeouts();
        setHello(false);

        //warn message about the boundaries 
        if (msg) {
            toast.warn(msg, {
                position: "top-center",
                autoClose: 2000,
                borderRadius: '20px',
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        if (ref.current) {
            ref.current.style.transform = `scale(${scale}) translate(${r}, ${t}) rotate(${angle})`;
        }
        if (ref2.current) {
            ref2.current.style.transform = `scale(${scale2}) translate(${r2}, ${t2}) rotate(${angle2})`;
        }
    };

    //function to start the actions
    //send true as a parameter if the actions are for the first sprite else false 
    function runAction1() {
        actions && actions.map((item, i) => {
            startActions(item.todo, i, true);
            return
        });
    }
    function runAction2() {
        !displayAddIcon && actions2 && actions2.map((item, i) => { startActions(item.todo, i, false); return });
    }

    const detectCollision = (sprite1, sprite2) => {
        if (displayAddIcon) return;
        const rect1 = sprite1.getBoundingClientRect(); // Get bounding box for sprite1
        const rect2 = sprite2.getBoundingClientRect(); // Get bounding box for sprite2

        return (
            rect1.left <= rect2.right &&
            rect1.right >= rect2.left &&
            rect1.top <= rect2.bottom &&
            rect1.bottom >= rect2.top
        );
    };


    // Function to swap animations between two sprites
    const swapAnimations = () => {
        let a1 = [...actions]
        let a2 = [...actions2]
        setActions(a2);
        setActions2(a1)
    };


    return (
        <div className='mainContainer'>
            <ToastContainer />
            <div className="container">
                <Droppable droppableId="MovesList">
                    {(provided) => (
                        <div
                            className="moves"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className='moves__heading'>
                                Motion
                            </div>
                            {moves?.map((move, index) => (
                                <SingleAction
                                    disableDelete={true}
                                    index={index}
                                    moves={moves}
                                    move={move}
                                    key={move.id}
                                    setMoves={setMoves}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="MovesActions">
                    {(provided) => (
                        <div
                            className="moves actions"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span className='moves__heading'>
                                Action 1
                            </span>
                            {actions?.map((move, index) => (
                                <SingleAction
                                    index={index}
                                    moves={actions}
                                    move={move}
                                    key={move.id}
                                    refresh={refresh}
                                    setMoves={setActions}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {displayAddIcon &&
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="icon">
                            <AddBoxIcon sx={{ color: 'gray', cursor: 'pointer' }} onClick={() => {
                                setDisplayAddIcon(!displayAddIcon);
                                setSprite2(require('../Assets/images/ball.png'));
                                refresh();
                            }} />
                            <span class="tooltiptext">add sprite</span>
                        </div>
                    </div>
                }
                {!displayAddIcon &&
                    <Droppable droppableId="MovesActions2">
                        {(provided) => (
                            <div
                                className="moves actions"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <span className='moves__heading'>
                                    Action 2
                                </span>
                                {actions2?.map((move, index) => (
                                    <SingleAction
                                        index={index}
                                        moves={actions2}
                                        move={move}
                                        key={move.id}
                                        refresh={refresh}
                                        setMoves={setActions2}
                                    />
                                ))}
                                {provided.placeholder}

                            </div>
                        )}
                    </Droppable>
                }
                {!displayAddIcon &&
                    <div className="icon">
                        <DisabledByDefaultIcon sx={{ color: 'gray', cursor: 'pointer' }} onClick={() => {
                            setDisplayAddIcon(!displayAddIcon);
                            setSprite2(null);
                            refresh();
                        }} />
                        <div><DeleteIcon onClick={() => { setActions([]); setActions2([]) }} sx={{ cursor: 'pointer', fontSize: '30px', color: 'Grey' }} /></div>
                    </div>
                }

                <div className="moves play"

                >
                    <Draggable1 bounds={{ left: -540, top: -250, right: 540, bottom: 250 }}>
                        <div style={{ display: 'flex', flexDirection: "row" }}>
                            <div ref={ref} style={{
                                position: 'relative',
                                transition: '1s all ease'
                            }}
                            >
                                {hello ?
                                    <div style={{ transition: "0s all ease" }} className='msgPopup'>
                                        hello!
                                    </div>
                                    : null
                                }
                                <img src={sprite}
                                    draggable='false'
                                    style={{
                                        cursor: "pointer",
                                        position: 'relative',
                                        height: 200,
                                        width: 200,
                                        transition: '1s all ease'
                                    }}
                                />
                            </div>
                            {!displayAddIcon && <div ref={ref2} style={{
                                position: 'relative',
                                transition: '1s all ease'
                            }}
                            >
                                <img src={sprite2}
                                    draggable='false'
                                    style={{
                                        cursor: "pointer",
                                        position: 'relative',
                                        height: 200,
                                        width: 200,
                                        transition: '1s all ease'
                                    }}
                                />
                            </div>}
                        </div>
                    </Draggable1>
                </div>
            </div>

            <div className="gameProps">

                <div className='playRefresh' >
                    <Button variant="contained" sx={{ borderRadius: "20px", marginRight: '5px', height: "40px", width: '80px' }}
                        color='success' onClick={() => {
                            runAction1();

                            runAction2();


                        }}
                    >
                        <PlayArrowIcon />
                    </Button>
                    <Button variant="contained" sx={{ borderRadius: "20px", height: "40px", width: '80px' }}
                        color='error' onClick={refresh}
                    >
                        <RefreshIcon sx={{ color: 'white' }} />
                    </Button>
                </div>
            </div>
        </div>

    );
}
export default EventBody;