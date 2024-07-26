import axios from '././axios';

export const getComments = async (postId) => {
    try {
        const response = await axios.get(`/api/questions/comments/${postId}`,{ withCredentials: true });
        return response;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (postId, comment) => {
    console.log('add comment : ',comment);
    try {
        const response = await axios.post(`/api/questions/comments/${postId}`,comment);
        return response.data;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
};

export const editComment = async (commentId, updatedComment) => {
    try {
        const response = await axios.put(`/api/questions/comments/${commentId}`, updatedComment);
        return response.data;
    } catch (error) {
        console.error('Error editing comment:', error);
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        const response = await axios.delete(`/api/questions/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
