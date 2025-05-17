import { useState } from 'react';
import { useComments, COMMENT_LIMIT } from './useComments';
import { useCreateComment } from '../lp/comments/useCreateComment';
import { useUpdateComment } from '../lp/comments/useUpdateComment';
import { useDeleteComment } from '../lp/comments/useDeleteComment';
import { useAuth } from '../../contexts/AuthContext';

export const useCommentManagement = (lpId: string, commentOrder: 'asc' | 'desc') => {
  const [commentInput, setCommentInput] = useState('');
  const [commentError, setCommentError] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [showMenuId, setShowMenuId] = useState<number | null>(null);
  const { user } = useAuth();

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isCommentLoading,
  } = useComments(lpId, commentOrder);

  const createCommentMutation = useCreateComment(lpId, commentOrder, setCommentInput, setCommentError);
  const updateCommentMutation = useUpdateComment(lpId, commentOrder, setEditingCommentId, setEditedContent, setCommentError);
  const deleteCommentMutation = useDeleteComment(lpId, commentOrder, setCommentError);

  const handleCommentSubmit = () => {
    if (!lpId) return;
    createCommentMutation.mutate({ lpId: Number(lpId), content: commentInput });
  };

  const handleCommentEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
    setShowMenuId(null);
  };

  const handleCommentDelete = (commentId: number) => {
    setShowMenuId(null);
    deleteCommentMutation.mutate(commentId);
  };

  const handleCommentUpdate = (commentId: number, content: string) => {
    updateCommentMutation.mutate({ commentId, content });
  };

  const handleCommentEditCancel = () => {
    setEditingCommentId(null);
    setEditedContent('');
  };

  return {
    commentInput,
    setCommentInput,
    commentError,
    editingCommentId,
    editedContent,
    setEditedContent,
    showMenuId,
    setShowMenuId,
    user,
    commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isCommentLoading,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
    handleCommentSubmit,
    handleCommentEdit,
    handleCommentDelete,
    handleCommentUpdate,
    handleCommentEditCancel,
    COMMENT_LIMIT
  };
}; 