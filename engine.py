import string
import random
import os
import sys
import time

class minimax_engine:
    whiteSet = ['P','R','T','B','Q','K']
    blackSet = ['p','r','t','b','q','k']

    #---------------------------------------------------------------------------------------------#
    def ChessBoardSetup():
        return [['r','t','b','q','k','b','t','r'],['p','p','p','p','p','p','p','p'],['.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.'],['.','.','.','.','.','.','.','.'],['P','P','P','P','P','P','P','P'],['R','T','B','Q','K','B','T','R']]

    board = ChessBoardSetup()

    #---------------------------------------------------------------------------------------------#
    def IsMoveLegal(src, dest):
        empty = '.'

        if (src[0] >= 0 and src[0] <= 7) and (src[1] >= 0 and src[1] <= 7):
            srcP = minimax_engine.board[src[0]][src[1]]
        else:
            print("Illegal src used")
            return False
        if (dest[0] >= 0 and dest[0] <= 7) and (dest[1] >= 0 and dest[1] <= 7):
            destP = minimax_engine.board[dest[0]][dest[1]]
        else:
            print("Illegal dest used")
            return False

        if src == dest:
            return False

        # need to define checks for en-passant and promotion
            # for promotion I may not need to consider whether the move is legal since the only issue with legality of promoting is the initial check for whether it places the player in check
            # for en-passant
                # unsure how to do this
                # en-passant is triggered when the opponent pawn jumps 2 squares
                    # may be easiest to track whether en-passant is possible on the board on the client side
                    # set a flag for en-passant available
                # en-passant may be easiest to verify entirely on the client side, but I will need to make sure that successful en-passant correctly updates the current player
        # White pawn check
        if srcP == 'P':
            if destP == empty:
                if (src[0] == dest[0] + 1) and (src[1] == dest[1]):
                    return True
                elif (src[0] == dest[0] + 2) and (src[0] == 6) and (src[1] == dest[1]):
                    return True
            else:
                if (src[0] == dest[0] + 1) and ((src[1] == dest[1] - 1) or (src[1] == dest[1] + 1)) and (destP in minimax_engine.blackSet):
                    return True

        # Black pawn check
        if srcP == 'p':
            if destP == empty:
                if (dest[0] == src[0] + 1) and (src[1] == dest[1]):
                    return True
                elif (dest[0] == src[0] + 2) and (src[0] == 1) and (src[1] == dest[1]) and (minimax_engine.board[src[0] + 1][src[1]] == empty):
                    return True
            else:
                if (dest[0] == src[0] + 1) and ((src[1] == dest[1] - 1) or (src[1] == dest[1] + 1)) and (destP in minimax_engine.whiteSet):
                    return True

        # white rook check
        if srcP == 'R':
            if src[0] == dest[0] and src[1] != dest[1]:
                if abs(src[1] - dest[1]) > 1:
                    for i in range(min(src[1], dest[1]) + 1, max(src[1], dest[1])):
                            if minimax_engine.board[src[0]][i] != empty:
                                return False
            elif src[0] != dest[0] and src[1] == dest[1]:
                if abs(src[0] - dest[0]) > 1:
                    for i in range(min(src[0], dest[0]) + 1, max(src[0], dest[0])):
                            if minimax_engine.board[i][src[1]] != empty:
                                return False
            else:
                return False
            if not(destP in minimax_engine.whiteSet):
                return True

        # black rook check
        if srcP == 'r':
            if src[0] == dest[0] and src[1] != dest[1]:
                if abs(src[1] - dest[1]) > 1:
                    for i in range(min(src[1], dest[1]) + 1, max(src[1], dest[1])):
                            if minimax_engine.board[src[0]][i] != empty:
                                return False
            elif src[0] != dest[0] and src[1] == dest[1]:
                if abs(src[0] - dest[0]) > 1:
                    for i in range(min(src[0], dest[0]) + 1, max(src[0], dest[0])):
                            if minimax_engine.board[i][src[1]] != empty:
                                return False
            else:
                return False
            if not(destP in minimax_engine.blackSet):
                return True

        # white bishop check
        if srcP == 'B':
            if abs(src[0] - dest[0]) == abs(src[1] - dest[1]):
                temp = [dest[0], dest[1]]
                hStep = int((-(temp[0] - src[0]) / abs(temp[0] - src[0])))
                vStep = int((-(temp[1] - src[1]) / abs(temp[1] - src[1])))
                temp[0] = temp[0] + hStep
                temp[1] = temp[1] + vStep

                while(abs(temp[0] - src[0]) > 0):
                    if minimax_engine.board[temp[0]][temp[1]] != empty:
                        return False
                    temp[0] = temp[0] + hStep
                    temp[1] = temp[1] + vStep
            else:
                return False
            if not(destP in minimax_engine.whiteSet):
                return True

        # black bishop check
        if srcP == 'b':
            if abs(src[0] - dest[0]) == abs(src[1] - dest[1]):
                temp = [dest[0], dest[1]]
                hStep = int((-(temp[0] - src[0]) / abs(temp[0] - src[0])))
                vStep = int((-(temp[1] - src[1]) / abs(temp[1] - src[1])))
                temp[0] = temp[0] + hStep
                temp[1] = temp[1] + vStep

                while(abs(temp[0] - src[0]) > 0):
                    if minimax_engine.board[temp[0]][temp[1]] != empty:
                        return False
                    temp[0] = temp[0] + hStep
                    temp[1] = temp[1] + vStep
            else:
                return False
            if not(destP in minimax_engine.blackSet):
                return True


        # white knight check
        if srcP == 'T':
            if ((abs(src[0]-dest[0]) == 2) and (abs(src[1]-dest[1]) == 1)) or ((abs(src[0]-dest[0]) == 1) and (abs(src[1]-dest[1]) == 2)):
                if not(destP in minimax_engine.whiteSet):
                    return True

        # black knight check
        if srcP == 't':
            if ((abs(src[0]-dest[0]) == 2) and (abs(src[1]-dest[1]) == 1)) or ((abs(src[0]-dest[0]) == 1) and (abs(src[1]-dest[1]) == 2)):
                if not(destP in minimax_engine.blackSet):
                    return True

        # white queen check
        if srcP == 'Q':
            if src[0] == dest[0] and src[1] != dest[1]:
                for piece in minimax_engine.board[src[0]][(min(dest[1],src[1]) + 1):max(dest[1], src[1])]:
                    if piece != empty:
                        return False
            elif src[0] != dest[0] and src[1] == dest[1]:
                if abs(src[0] - dest[0]) > 1:
                    for i in range(min(src[0], dest[0]) + 1, max(src[0], dest[0])):
                        if minimax_engine.board[i][src[1]] != empty:
                            return False
            elif abs(src[0] - dest[0]) == abs(src[1] - dest[1]):
                temp = [dest[0], dest[1]]
                hStep = int((-(temp[0] - src[0]) / abs(temp[0] - src[0])))
                vStep = int((-(temp[1] - src[1]) / abs(temp[1] - src[1])))
                temp[0] = temp[0] + hStep
                temp[1] = temp[1] + vStep

                while(abs(temp[0] - src[0]) > 0):
                    if minimax_engine.board[temp[0]][temp[1]] != empty:
                        return False
                    temp[0] = temp[0] + hStep
                    temp[1] = temp[1] + vStep
            else:
                return False
            if not(destP in minimax_engine.whiteSet):
                return True

        # black queen check
        if srcP == 'q':
            if src[0] == dest[0] and src[1] != dest[1]:
                for piece in minimax_engine.board[src[0]][(min(dest[1],src[1]) + 1):max(dest[1], src[1])]:
                    if piece != empty:
                        return False
            elif src[0] != dest[0] and src[1] == dest[1]:
                if abs(src[0] - dest[0]) > 1:
                    for i in range(min(src[0], dest[0]) + 1, max(src[0], dest[0])):
                        if minimax_engine.board[i][src[1]] != empty:
                            return False
            elif abs(src[0] - dest[0]) == abs(src[1] - dest[1]):
                temp = [dest[0], dest[1]]
                hStep = int((-(temp[0] - src[0]) / abs(temp[0] - src[0])))
                vStep = int((-(temp[1] - src[1]) / abs(temp[1] - src[1])))
                temp[0] = temp[0] + hStep
                temp[1] = temp[1] + vStep

                while(abs(temp[0] - src[0]) > 0):
                    if minimax_engine.board[temp[0]][temp[1]] != empty:
                        return False
                    temp[0] = temp[0] + hStep
                    temp[1] = temp[1] + vStep
            else:
                return False
            if not(destP in minimax_engine.blackSet):
                return True

        # add castling validity check here
            # initial validity that checks whether king and rook have been moved will take place on the front end
            # only checks here should be for castling through/out of check 
        # white king check
        if srcP == 'K':
            if abs(src[0] - dest[0]) == 1 and abs(src[1] - dest[1]) == 0 and not(destP in minimax_engine.whiteSet):
                return True
            elif abs(src[0] - dest[0]) == 0 and abs(src[1] - dest[1]) == 1 and not(destP in minimax_engine.whiteSet):
                return True
            elif abs(src[0] - dest[0]) == 1 and abs(src[1] - dest[1]) == 1 and not(destP in minimax_engine.whiteSet):
                return True

        # black king check
        if srcP == 'k':
            if abs(src[0] - dest[0]) == 1 and abs(src[1] - dest[1]) == 0 and not(destP in minimax_engine.blackSet):
                return True
            elif abs(src[0] - dest[0]) == 0 and abs(src[1] - dest[1]) == 1 and not(destP in minimax_engine.blackSet):
                return True
            elif abs(src[0] - dest[0]) == 1 and abs(src[1] - dest[1]) == 1 and not(destP in minimax_engine.blackSet):
                return True

        return False

    #---------------------------------------------------------------------------------------------#
    # gets a list of legal moves for a given player
    def GetListOfLegalMoves(player, src):
        legalMoves = []

        for i in range(0,8):
            for j in range(0,8):
                if minimax_engine.IsMoveLegal(src, (i,j)):
                    if not(minimax_engine.DoesMovePutPlayerInCheck(player, src, (i,j))):
                        legalMoves.append((i,j))
        return legalMoves

    #---------------------------------------------------------------------------------------------#
    # gets a list of all pieces for the current player that have legal moves
    def GetPiecesWithLegalMoves(player):
        if player == 'w':
            playerSet = minimax_engine.whiteSet
        else:
            playerSet = minimax_engine.blackSet
        legalPieces = {}

        for i in range(0,8):
            for j in range(0,8):
                if minimax_engine.board[i][j] in playerSet:
                    temp = minimax_engine.GetListOfLegalMoves(player, (i,j))
                    if len(temp) > 0:
                        legalPieces[(i,j)] = temp
        return legalPieces

    #---------------------------------------------------------------------------------------------#
    # determines if given player is checkmated
    def IsCheckmate(player):
        if len(minimax_engine.GetPiecesWithLegalMoves(player)) == 0:
            return True
        else:
            return False

    #---------------------------------------------------------------------------------------------#
    # determines if the given player is in check
    def IsInCheck(player):
        targetSquare = ()

        if player == 'w':
            target = 'K'
            playerSet = minimax_engine.whiteSet
            enemySet = minimax_engine.blackSet
        else:
            target = 'k'
            playerSet = minimax_engine.blackSet
            enemySet = minimax_engine.whiteSet

        for i in range(0,8):
            for j in range(0,8):
                if minimax_engine.board[i][j] == target:
                    targetSquare = (i,j)
        if not(targetSquare):
            # print(f"\nNo king found for {player} with board\n{DrawBoard(board)}\n\n")
            return False

        for i in range(0,8):
            for j in range(0,8):
                if minimax_engine.board[i][j] in enemySet:
                    if minimax_engine.IsMoveLegal((i,j), targetSquare):
                        return True
        return False

    #---------------------------------------------------------------------------------------------#
    # determines whether move places current player in check
    def DoesMovePutPlayerInCheck(player, src, dest):
        srcP = minimax_engine.board[src[0]][src[1]]
        destP = minimax_engine.board[dest[0]][dest[1]]

        minimax_engine.board[dest[0]][dest[1]] = srcP
        minimax_engine.board[src[0]][src[1]] = '.'

        result = minimax_engine.IsInCheck(player)

        minimax_engine.board[dest[0]][dest[1]] = destP
        minimax_engine.board[src[0]][src[1]] = srcP

        return result

    #---------------------------------------------------------------------------------------------#
    # function that performs moves on the chessboard
    def movePiece(src, dest, cBoard):
        cBoard[dest[0]][dest[1]] = cBoard[src[0]][src[1]]
        cBoard[src[0]][src[1]] = '.'

    #---------------------------------------------------------------------------------------------#
    # Returns random legal move for current player
    def GetRandomMove(player):
        # pick a random piece and a random legal move for that piece
        pieces = minimax_engine.GetPiecesWithLegalMoves(player)
        if not(pieces) and minimax_engine.IsInCheck(player):
            print(f"{player} is checkmated")
            return None
        elif not(pieces):
            print(f"{player} is stalemated")
        piecesKeys = list(pieces.keys())
        try:
            piece = piecesKeys[random.randint(0,len(piecesKeys) - 1)]
            move = pieces[piece][random.randint(0,len(pieces[piece]) - 1)]
            #print(f"type: {board[piece[0]][piece[1]]} | src: {piece} | dest: {move}")
            return [piece,move]
        except:
            print(f"Keys len: {len(piecesKeys)}")
            return False

    #---------------------------------------------------------------------------------------------#
    # Board evaluation function
    # evaluation is agnostic of player
        # advantages for current player are positive regardless of who is current player
        # advantages for current opponent are negative regardless of who is current player
    def evl(player):
        if player == 'w':
            playerSet = minimax_engine.whiteSet
            oppSet = minimax_engine.blackSet
        else:
            playerSet = minimax_engine.blackSet
            oppSet = minimax_engine.whiteSet
        sum = 0
        for i in range(0,8):
            for j in range(0,8):
                piece = minimax_engine.board[i][j]
                if piece in playerSet:
                    if piece == 'R' or piece == 'r':
                        sum = sum + 5
                    elif piece == 'Q' or piece == 'q':
                        sum = sum + 9
                    elif piece == 'T' or piece == 't':
                        sum = sum + 3
                    elif piece == 'B' or piece == 'b':
                        sum = sum + 3
                    elif piece == 'P' or piece == 'p':
                        sum = sum + 1
                    elif piece == 'K' or piece == 'k':
                        sum = sum + 1000
                    else:
                        continue
                else:
                    if piece == 'R' or piece == 'r':
                        sum = sum - 5
                    elif piece == 'Q' or piece == 'q':
                        sum = sum - 9
                    elif piece == 'T' or piece == 't':
                        sum = sum - 3
                    elif piece == 'B' or piece == 'b':
                        sum = sum - 3
                    elif piece == 'P' or piece == 'p':
                        sum = sum - 1
                    elif piece == 'K' or piece == 'k':
                        sum = sum - 1000
                    else:
                        continue
        return sum

    #---------------------------------------------------------------------------------------------#
    # definition for minmax algorithm used to select moves
    # function does not implement pruning
    def GetMinMaxMove(player):
        bestMove = [[],-10000]
        oppBestMove = [[],10000]
        bestMoves = []
        bestOppMoves = []

        if player == 'w':
            opp = 'b'
            playerSet = minimax_engine.whiteSet
        else:
            opp = 'w'
            playerSet = minimax_engine.blackSet

        pieces = minimax_engine.GetPiecesWithLegalMoves(player)

        for piece in pieces:
            moves = pieces[piece]

            for move in moves:
                bestOppMove = [[],10000]

                srcP = minimax_engine.board[piece[0]][piece[1]]
                destP = minimax_engine.board[move[0]][move[1]]
                minimax_engine.board[piece[0]][piece[1]] = '.'
                minimax_engine.board[move[0]][move[1]] = srcP

                oppPieces = minimax_engine.GetPiecesWithLegalMoves(opp)

                for oppPiece in oppPieces:
                    oppMoves = oppPieces[oppPiece]
                    for oppMove in oppMoves:
                        oppsrcP = minimax_engine.board[oppPiece[0]][oppPiece[1]]
                        oppdestP = minimax_engine.board[oppMove[0]][oppMove[1]]
                        minimax_engine.board[oppPiece[0]][oppPiece[1]] = '.'
                        minimax_engine.board[oppMove[0]][oppMove[1]] = oppsrcP

                        res = minimax_engine.evl(player)

                        if res < bestOppMove[1]:
                            bestOppMove[0] = oppMove
                            bestOppMove[1] = res

                        minimax_engine.board[oppPiece[0]][oppPiece[1]] = oppsrcP
                        minimax_engine.board[oppMove[0]][oppMove[1]] = oppdestP

                bestOppMoves.append([[piece,move],bestOppMove])

                minimax_engine.board[piece[0]][piece[1]] = srcP
                minimax_engine.board[move[0]][move[1]] = destP

        for move in bestOppMoves:
            if move[1][1] > bestMove[1]:
                bestMove[0] = move[0]
                bestMove[1] = move[1][1]
                bestMoves = []
                bestMoves.append(bestMove)
            elif move[1][1] == bestMove[1]:
                bestMoves.append([move[0],move[1][1]])

        selectMove = bestMoves[random.randint(0,len(bestMoves) - 1)]

        return selectMove[0]