import React, { useState } from 'react'
import { ArrowLeft,ArrowRight} from 'lucide-react'
const ReviewPage = () => {
    //fetch array of obj contain reviews
    const reviewArr = [
        {
            "name": "John Doe",
            "stars": "5",
            "mainLine": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "sublines": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "date": "2024-03-12"
        },
        {
            "name": "Jane Smith",
            "stars": "4",
            "mainLine": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "sublines": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
            "date": "2024-03-11"
        },
        {
            "name": "Alice Johnson",
            "stars": "3",
            "mainLine": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
            "sublines": "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
            "date": "2024-03-10"
        },
        {
            "name": "Bob Williams",
            "stars": "5",
            "mainLine": "Suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
            "sublines": "Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
            "date": "2024-03-09"
        },
        {
            "name": "Eve Brown",
            "stars": "2",
            "mainLine": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
            "sublines": "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
            "date": "2024-03-08"
        }
    ]

    const [pointer,setPointer] = useState(0) ;
    const review = reviewArr[pointer] ;

   function leftClickHandler(){
        if(pointer!==0){
            setPointer(pointer-1) ;
        }
    }
   function rightClickHandler(){
        if(pointer!==reviewArr.length-1){
            setPointer(pointer+1) ;
        }
    }
    
  return (
    <div>
        <p>User Reviews</p>
        <div>dkfjs sdvksdjv sdvkmsdvkj adsocmaoscn sadcoi ascoim ascoaicm ascmascom ascascmoimoim ascascamscimmascm</div>
        <div>
            <div>{review.mainLine}</div>
            <div>{review.sublines}</div>
            <p>{review.name}</p>
            <p>{review.date}</p>
            <div>
           {pointer!==0 && < ArrowLeft onClick={leftClickHandler} />}
           {pointer!==reviewArr.length-1 && <ArrowRight onClick={rightClickHandler}/>}
            </div>
        </div>
    </div>
  )
}

export default ReviewPage