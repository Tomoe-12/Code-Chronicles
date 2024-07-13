// import { useState, useRef, useEffect } from "react";
// import Action from "./Action";
// import reply from '../../assets/Icon/commentSection/reply.svg'
// import downArrow from '../../assets/Icon/commentSection/down-arrow.svg'
// import edit from '../../assets/Icon/commentSection/edit.svg'
// import deleteIcon from '../../assets/Icon/commentSection/delete.svg'
// import { formatDistanceToNow } from "date-fns";
// // import { ReactComponent as UpArrow } from '../../assets/Icon/up-arrow.svg';

// const CommentBox = ({
//   handleInsertNode,
//   handleEditNode,
//   handleDeleteNode,
//   comment,
// }) => {
//   const [input, setInput] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showInput, setShowInput] = useState(false);
//   const [expand, setExpand] = useState(false);
//   const inputRef = useRef(null);
//   const [inputError, setInputError] = useState(false); // add this state

//   useEffect(() => {
//     inputRef?.current?.focus();
//   }, [editMode]);

//   const handleNewComment = () => {
//     setExpand(!expand);
//     setShowInput(true);
//   };

//   const handleSeeMore = () => {
//     setExpand(!expand);
//   }

//   const onAddComment = () => {
//     if (editMode) {
//       handleEditNode(comment.id, inputRef?.current?.innerText);
//     } else {
//       if (input.trim() === '') {
//         setInputError(true); // set inputError to true
//         return;
//       }
//       setExpand(true);
//       handleInsertNode(comment.id, input);
//       setShowInput(false);
//       setInput("");
//     }

//     if (editMode) setEditMode(false);
//   };

//   const handleDelete = () => {
//     setEditMode(false);
//     handleDeleteNode(comment.id);
//   };

//   return (
//     <div>
//       <div className={comment.id === 1 ? "inputContainer mb-10" : "commentContainer "}>
//         {comment.id === 1 ? (
//           <>
//             <textarea
//               rows={3}
//               type="text"
//               className={`min-h-16 max-h-32 inputContainer__input first_input w-full ${inputError ? 'error' : ''}`}
//               autoFocus
//               value={input}
//               onChange={(e) => { setInput(e.target.value); setInputError(false) }}
//               placeholder="Add a Comment....."
//             />
//             <div className="flex items-end justify-center">
//               <Action
//                 className="reply comment"
//                 type="COMMENT"
//                 handleClick={onAddComment}
//               />
//             </div>
//           </>
//         ) : (
//           <>
//             <div className=" w-full h-full  flex items-start space-x-3  justify-start">
//               {
//                 comment.author?.photoURL
//                   ? <img src="" className="min-w-8 h-8 lg:w-10 lg:h-10 rounded-full " alt="" />
//                   :
//                   <div className="min-w-8 min-h-8 max-w-8 max-h-8 lg:w-10 lg:h-10 overflow-hidden border-2 border-gray-400 rounded-full ">
//                     <svg className="object-cover w-full h-full" alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>                  </div>
//               }
//               <div>
//                 {/* comment text field */}
//                 <div className="max-w-96 w-fit">
//                   <div className="bg-gray-700 px-3 py-2 rounded-lg">
//                     <div className="flex w-full items-center gap-2 mb-2">
//                       <p className="text-start md:text-lg text-sm font-bold">hello world</p> {/*{comment.author.name}*/}
//                       <p className="text-xs text-gray-500 text-start">1minute ago</p> {/*{formatDistanceToNow(new Date(comment.createdAt))}*/}
//                     </div>
//                     {/* comment box */}
//                     <span
//                       contentEditable={editMode}
//                       suppressContentEditableWarning={editMode}
//                       ref={inputRef}
//                       style={{ wordWrap: "break-word" }}

//                     >
//                       {comment.name}
//                     </span>
//                   </div>
//                 </div>
//                 {/*see more, reply, edit, delete button */}
//                 <div className="flex flex-col items-start">
//                   <div className="flex gap-2">
//                     {editMode ? (
//                       <>
//                         <div className="w-fit flex">
//                           <Action
//                             className="reply"
//                             type="SAVE"
//                             handleClick={onAddComment}
//                           />
//                           <Action
//                             className="reply"
//                             type="CANCEL"
//                             handleClick={() => {
//                               if (inputRef.current)
//                                 inputRef.current.innerText = comment.name;
//                               setEditMode(false);
//                             }}
//                           />
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <Action
//                           className="reply "
//                           type={
//                             <>
//                             <img src={reply} className="w-[15px] h-[15px]" alt="" />
//                               REPLY
//                             </>
//                           }
//                           handleClick={handleNewComment}
//                         />
//                         <Action
//                           className={`reply `}
//                           type={
//                             <>
//                               <img src={edit} className="w-[14px] h-[14px]" alt="" />
//                               EDIT
//                             </>
//                           }
//                           handleClick={() => {
//                             setEditMode(true);
//                           }}
//                         />
//                         <Action
//                           className={`reply `}
//                           type={
//                             <>
//                               <img src={deleteIcon} className="w-[14px] h-[14px]" alt="" />
//                               DELETE
//                             </>
//                           }
//                           handleClick={handleDelete}
//                         />
//                       </>
//                     )}
//                   </div>
//                   <Action
//                     className={`reply `}
//                     type={
//                       <>
//                         <img src={downArrow} className="w-[14px] h-[14px]" alt="" />
//                         SEE MORE
//                       </>
//                     }
//                     handleClick={handleSeeMore}
//                   />
//                 </div>

//               </div>
//             </div>

//           </>
//         )}
//       </div>

//       {
//         inputError &&
//         <div className="mt-1 mb-5">
//           <p className="text-red-500 text-base">This field is required and cannot be empty</p>
//         </div>

//       }

//       <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
//         {showInput && (
//           <div className="flex gap-2 items-end">
//             <textarea
//               rows={3}
//               type="text"
//               className="min-h-16 max-h-32 w-72 lg:w-96 ml-12 border px-2 py-1 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg border-gray-600 placeholder-gray-400 text-white"
//               autoFocus
//               onChange={(e) => setInput(e.target.value)}
//             />
//             <Action className="reply edit"
//               type='REPLY'
//               handleClick={onAddComment}
//             />
//             <Action
//               className="reply "
//               type="CANCEL"
//               handleClick={() => {
//                 setShowInput(false);
//                 if (!comment?.items?.length) setExpand(false);
//               }}
//             />
//           </div>
//         )}

//         {comment?.items?.map((cmnt) => {
//           return (
//             <CommentBox
//               key={cmnt.id}
//               handleInsertNode={handleInsertNode}
//               handleEditNode={handleEditNode}
//               handleDeleteNode={handleDeleteNode}
//               comment={cmnt}
//             />
//           );
//         })}
//       </div>


//     </div>
//   );
// };

// export default CommentBox;

import { useState, useRef, useEffect } from "react";
import Action from "./Action";
import reply from '../../assets/Icon/commentSection/reply.svg'
import upArrow from '../../assets/Icon/commentSection/up-arrow.svg'
import downArrow from '../../assets/Icon/commentSection/down-arrow.svg'
import edit from '../../assets/Icon/commentSection/edit.svg'
import deleteIcon from '../../assets/Icon/commentSection/delete.svg'
import { formatDistanceToNow } from "date-fns";
// import { ReactComponent as UpArrow } from '../../assets/Icon/up-arrow.svg';

const CommentBox = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(false); // add this state

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const handleSeeMore = () => {
    setExpand(!expand);

  }

  const onAddComment = () => {
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      if (input.trim() === '') {
        setInputError(true); // set inputError to true
        return;
      }
      setExpand(true);
      handleInsertNode(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    setEditMode(false);
    handleDeleteNode(comment.id);
  };

  return (
    <div>
      <div className={comment.id === 1 ? "inputContainer mb-10" : "commentContainer "}>
        {comment.id === 1 ? (
          <>
            <textarea
              rows={3}
              type="text"
              className={`min-h-16 max-h-32 inputContainer__input first_input w-full ${inputError ? 'error' : ''}`}
              autoFocus
              value={input}
              onChange={(e) => { setInput(e.target.value); setInputError(false) }}
              placeholder="Add a Comment....."
            />
            <div className="flex items-end justify-center">
              <Action
                className="reply comment"
                type="COMMENT"
                handleClick={onAddComment}
              />
            </div>
          </>
        ) : (
          <>
            <div className=" w-full h-full  flex items-start space-x-3  justify-start">
              {
                comment.author?.photoURL
                  ? <img src="" className="min-w-8 h-8 lg:w-10 lg:h-10 rounded-full " alt="" />
                  :
                  <div className="min-w-8 min-h-8 max-w-8 max-h-8 lg:w-10 lg:h-10 overflow-hidden border-2 border-gray-400 rounded-full ">
                    <svg className="object-cover w-full h-full" alt="avatar" viewBox="0 0 32.000001 32.000001" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><metadata id="metadata7"><rdf:rdf><cc:work><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title /><dc:creator><cc:agent><dc:title>Timothée Giet</dc:title></cc:agent></dc:creator><dc:date>2021</dc:date><dc:description /><cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" /></cc:work><cc:license rdf:about="http://creativecommons.org/licenses/by-sa/4.0/"><cc:permits rdf:resource="http://creativecommons.org/ns#Reproduction" /><cc:permits rdf:resource="http://creativecommons.org/ns#Distribution" /><cc:requires rdf:resource="http://creativecommons.org/ns#Notice" /><cc:requires rdf:resource="http://creativecommons.org/ns#Attribution" /><cc:permits rdf:resource="http://creativecommons.org/ns#DerivativeWorks" /><cc:requires rdf:resource="http://creativecommons.org/ns#ShareAlike" /></cc:license></rdf:rdf></metadata><circle r="7.5" cy="9.5" cx={16} id="path839" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /><path id="rect841" d="M16 19c6.648 0 12 2.899 12 6.5V32H4v-6.5C4 21.899 9.352 19 16 19z" style={{ opacity: 1, vectorEffect: 'none', fill: '#999999', fillOpacity: 1, stroke: 'none', strokeWidth: 2, strokeLinecap: 'butt', strokeLinejoin: 'bevel', strokeMiterlimit: 4, strokeDasharray: 'none', strokeDashoffset: '3.20000005', strokeOpacity: 1 }} /></g></svg>                  </div>
              }
              <div>
                {/* comment text field */}
                <div className="max-w-96 w-fit">
                  <div className="bg-gray-700 px-3 py-2 rounded-lg">
                    <div className="flex w-full items-center gap-2 mb-2">
                      <p className="text-start md:text-lg text-sm font-bold">hello world</p> {/*{comment.author.name}*/}
                      <p className="text-xs text-gray-500 text-start">1minute ago</p> {/*{formatDistanceToNow(new Date(comment.createdAt))}*/}
                    </div>
                    {/* comment box */}
                    <span
                      contentEditable={editMode}
                      suppressContentEditableWarning={editMode}
                      ref={inputRef}
                      style={{ wordWrap: "break-word" }}

                    >
                      {comment.name}
                    </span>
                  </div>
                </div>
                {/*see more, reply, edit, delete button */}
                <div className="flex flex-col items-start">
                  <div className="flex gap-2">
                    {editMode ? (
                      <>
                        <div className="w-fit flex">
                          <Action
                            className="reply"
                            type="SAVE"
                            handleClick={onAddComment}
                          />
                          <Action
                            className="reply"
                            type="CANCEL"
                            handleClick={() => {
                              if (inputRef.current)
                                inputRef.current.innerText = comment.name;
                              setEditMode(false);
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Action
                          className="reply "
                          type={
                            <>
                              <img src={reply} className="w-[15px] h-[15px]" alt="" />
                              REPLY
                            </>
                          }
                          handleClick={handleNewComment}
                        />
                        <Action
                          className={`reply `}
                          type={
                            <>
                              <img src={edit} className="w-[14px] h-[14px]" alt="" />
                              EDIT
                            </>
                          }
                          handleClick={() => {
                            setEditMode(true);
                          }}
                        />
                        <Action
                          className={`reply `}
                          type={
                            <>
                              <img src={deleteIcon} className="w-[14px] h-[14px]" alt="" />
                              DELETE
                            </>
                          }
                          handleClick={handleDelete}
                        />
                      </>
                    )}
                  </div>
                  {comment.items && comment.items.length > 0 && (
                    <Action
                      className={`reply `}
                      type={
                        <>
                          {
                            !expand
                              ?
                              <><img src={downArrow} className="w-[14px] h-[14px]" alt="" />
                                SEE MORE
                              </>
                              :
                              <><img src={upArrow} className="w-[14px] h-[14px]" alt="" />
                                SHOW LESS
                              </>
                          }
                        </>
                      }
                      handleClick={handleSeeMore}
                    />
                  )}
                </div>

              </div>
            </div>

          </>
        )}
      </div>

      {
        inputError &&
        <div className="mt-1 mb-5">
          <p className="text-red-500 text-base">This field is required and cannot be empty</p>
        </div>

      }

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="flex gap-2 items-end">
            <textarea
              rows={3}
              type="text"
              className="min-h-16 max-h-32 w-72 lg:w-96 ml-12 border px-2 py-1 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg border-gray-600 placeholder-gray-400 text-white"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <Action className="reply edit"
              type='REPLY'
              handleClick={onAddComment}
            />
            <Action
              className="reply "
              type="CANCEL"
              handleClick={() => {
                setShowInput(false);
                if (!comment?.items?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <CommentBox
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>


    </div>
  );
};


export default CommentBox;
