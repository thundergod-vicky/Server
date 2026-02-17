import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    phone: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    password: string | null;
    name: string | null;
    phone: string | null;
    role: $Enums.Role | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    password: number;
    name: number;
    phone: number;
    role: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    phone?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    phone?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    password?: true;
    name?: true;
    phone?: true;
    role?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserCountAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    password: string;
    name: string | null;
    phone: string | null;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    coursesOwned?: Prisma.CourseListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    progress?: Prisma.StudentProgressListRelationFilter;
    testResults?: Prisma.TestResultListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    parentOf?: Prisma.ParentStudentListRelationFilter;
    studentOf?: Prisma.ParentStudentListRelationFilter;
    sentMessages?: Prisma.ChatMessageListRelationFilter;
    receivedMessages?: Prisma.ChatMessageListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    coursesOwned?: Prisma.CourseOrderByRelationAggregateInput;
    enrollments?: Prisma.EnrollmentOrderByRelationAggregateInput;
    progress?: Prisma.StudentProgressOrderByRelationAggregateInput;
    testResults?: Prisma.TestResultOrderByRelationAggregateInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
    parentOf?: Prisma.ParentStudentOrderByRelationAggregateInput;
    studentOf?: Prisma.ParentStudentOrderByRelationAggregateInput;
    sentMessages?: Prisma.ChatMessageOrderByRelationAggregateInput;
    receivedMessages?: Prisma.ChatMessageOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    phone?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    password?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumRoleFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    coursesOwned?: Prisma.CourseListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    progress?: Prisma.StudentProgressListRelationFilter;
    testResults?: Prisma.TestResultListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    parentOf?: Prisma.ParentStudentListRelationFilter;
    studentOf?: Prisma.ParentStudentListRelationFilter;
    sentMessages?: Prisma.ChatMessageListRelationFilter;
    receivedMessages?: Prisma.ChatMessageListRelationFilter;
}, "id" | "email" | "phone">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumRoleWithAggregatesFilter<"User"> | $Enums.Role;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutParentOfInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutParentOfInput, Prisma.UserUncheckedCreateWithoutParentOfInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutParentOfInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutStudentOfInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudentOfInput, Prisma.UserUncheckedCreateWithoutStudentOfInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentOfInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutParentOfNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutParentOfInput, Prisma.UserUncheckedCreateWithoutParentOfInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutParentOfInput;
    upsert?: Prisma.UserUpsertWithoutParentOfInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutParentOfInput, Prisma.UserUpdateWithoutParentOfInput>, Prisma.UserUncheckedUpdateWithoutParentOfInput>;
};
export type UserUpdateOneRequiredWithoutStudentOfNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutStudentOfInput, Prisma.UserUncheckedCreateWithoutStudentOfInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutStudentOfInput;
    upsert?: Prisma.UserUpsertWithoutStudentOfInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutStudentOfInput, Prisma.UserUpdateWithoutStudentOfInput>, Prisma.UserUncheckedUpdateWithoutStudentOfInput>;
};
export type UserCreateNestedOneWithoutCoursesOwnedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCoursesOwnedInput, Prisma.UserUncheckedCreateWithoutCoursesOwnedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCoursesOwnedInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCoursesOwnedNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCoursesOwnedInput, Prisma.UserUncheckedCreateWithoutCoursesOwnedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCoursesOwnedInput;
    upsert?: Prisma.UserUpsertWithoutCoursesOwnedInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCoursesOwnedInput, Prisma.UserUpdateWithoutCoursesOwnedInput>, Prisma.UserUncheckedUpdateWithoutCoursesOwnedInput>;
};
export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.UserUpsertWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.UserUpdateWithoutEnrollmentsInput>, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserCreateNestedOneWithoutProgressInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutProgressNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutProgressInput;
    upsert?: Prisma.UserUpsertWithoutProgressInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutProgressInput, Prisma.UserUpdateWithoutProgressInput>, Prisma.UserUncheckedUpdateWithoutProgressInput>;
};
export type UserCreateNestedOneWithoutTestResultsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTestResultsInput, Prisma.UserUncheckedCreateWithoutTestResultsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTestResultsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTestResultsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTestResultsInput, Prisma.UserUncheckedCreateWithoutTestResultsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTestResultsInput;
    upsert?: Prisma.UserUpsertWithoutTestResultsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTestResultsInput, Prisma.UserUpdateWithoutTestResultsInput>, Prisma.UserUncheckedUpdateWithoutTestResultsInput>;
};
export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.UserUpsertWithoutPaymentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPaymentsInput, Prisma.UserUpdateWithoutPaymentsInput>, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
};
export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSentMessagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReceivedMessagesInput, Prisma.UserUncheckedCreateWithoutReceivedMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReceivedMessagesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSentMessagesInput;
    upsert?: Prisma.UserUpsertWithoutSentMessagesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSentMessagesInput, Prisma.UserUpdateWithoutSentMessagesInput>, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
};
export type UserUpdateOneWithoutReceivedMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReceivedMessagesInput, Prisma.UserUncheckedCreateWithoutReceivedMessagesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReceivedMessagesInput;
    upsert?: Prisma.UserUpsertWithoutReceivedMessagesInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReceivedMessagesInput, Prisma.UserUpdateWithoutReceivedMessagesInput>, Prisma.UserUncheckedUpdateWithoutReceivedMessagesInput>;
};
export type UserCreateWithoutParentOfInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutParentOfInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutParentOfInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutParentOfInput, Prisma.UserUncheckedCreateWithoutParentOfInput>;
};
export type UserCreateWithoutStudentOfInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutStudentOfInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutStudentOfInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudentOfInput, Prisma.UserUncheckedCreateWithoutStudentOfInput>;
};
export type UserUpsertWithoutParentOfInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutParentOfInput, Prisma.UserUncheckedUpdateWithoutParentOfInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutParentOfInput, Prisma.UserUncheckedCreateWithoutParentOfInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutParentOfInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutParentOfInput, Prisma.UserUncheckedUpdateWithoutParentOfInput>;
};
export type UserUpdateWithoutParentOfInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutParentOfInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserUpsertWithoutStudentOfInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutStudentOfInput, Prisma.UserUncheckedUpdateWithoutStudentOfInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutStudentOfInput, Prisma.UserUncheckedCreateWithoutStudentOfInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutStudentOfInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutStudentOfInput, Prisma.UserUncheckedUpdateWithoutStudentOfInput>;
};
export type UserUpdateWithoutStudentOfInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutStudentOfInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutCoursesOwnedInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutCoursesOwnedInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutCoursesOwnedInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCoursesOwnedInput, Prisma.UserUncheckedCreateWithoutCoursesOwnedInput>;
};
export type UserUpsertWithoutCoursesOwnedInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCoursesOwnedInput, Prisma.UserUncheckedUpdateWithoutCoursesOwnedInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCoursesOwnedInput, Prisma.UserUncheckedCreateWithoutCoursesOwnedInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCoursesOwnedInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCoursesOwnedInput, Prisma.UserUncheckedUpdateWithoutCoursesOwnedInput>;
};
export type UserUpdateWithoutCoursesOwnedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutCoursesOwnedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutEnrollmentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
};
export type UserUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutProgressInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutProgressInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
};
export type UserUpsertWithoutProgressInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutProgressInput, Prisma.UserUncheckedUpdateWithoutProgressInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutProgressInput, Prisma.UserUncheckedCreateWithoutProgressInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutProgressInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutProgressInput, Prisma.UserUncheckedUpdateWithoutProgressInput>;
};
export type UserUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutProgressInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutTestResultsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutTestResultsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutTestResultsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTestResultsInput, Prisma.UserUncheckedCreateWithoutTestResultsInput>;
};
export type UserUpsertWithoutTestResultsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTestResultsInput, Prisma.UserUncheckedUpdateWithoutTestResultsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTestResultsInput, Prisma.UserUncheckedCreateWithoutTestResultsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTestResultsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTestResultsInput, Prisma.UserUncheckedUpdateWithoutTestResultsInput>;
};
export type UserUpdateWithoutTestResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutTestResultsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutPaymentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
};
export type UserUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPaymentsInput, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPaymentsInput, Prisma.UserUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPaymentsInput, Prisma.UserUncheckedUpdateWithoutPaymentsInput>;
};
export type UserUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    receivedMessages?: Prisma.ChatMessageCreateNestedManyWithoutReceiverInput;
};
export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    receivedMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutReceiverInput;
};
export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
};
export type UserCreateWithoutReceivedMessagesInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageCreateNestedManyWithoutSenderInput;
};
export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: string;
    email: string;
    password: string;
    name?: string | null;
    phone?: string | null;
    role?: $Enums.Role;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    coursesOwned?: Prisma.CourseUncheckedCreateNestedManyWithoutTeacherInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutStudentInput;
    progress?: Prisma.StudentProgressUncheckedCreateNestedManyWithoutStudentInput;
    testResults?: Prisma.TestResultUncheckedCreateNestedManyWithoutStudentInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutStudentInput;
    parentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutParentInput;
    studentOf?: Prisma.ParentStudentUncheckedCreateNestedManyWithoutStudentInput;
    sentMessages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutSenderInput;
};
export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReceivedMessagesInput, Prisma.UserUncheckedCreateWithoutReceivedMessagesInput>;
};
export type UserUpsertWithoutSentMessagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSentMessagesInput, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSentMessagesInput, Prisma.UserUncheckedCreateWithoutSentMessagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSentMessagesInput, Prisma.UserUncheckedUpdateWithoutSentMessagesInput>;
};
export type UserUpdateWithoutSentMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    receivedMessages?: Prisma.ChatMessageUpdateManyWithoutReceiverNestedInput;
};
export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    receivedMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutReceiverNestedInput;
};
export type UserUpsertWithoutReceivedMessagesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReceivedMessagesInput, Prisma.UserUncheckedUpdateWithoutReceivedMessagesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReceivedMessagesInput, Prisma.UserUncheckedCreateWithoutReceivedMessagesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReceivedMessagesInput, Prisma.UserUncheckedUpdateWithoutReceivedMessagesInput>;
};
export type UserUpdateWithoutReceivedMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUpdateManyWithoutSenderNestedInput;
};
export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumRoleFieldUpdateOperationsInput | $Enums.Role;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    coursesOwned?: Prisma.CourseUncheckedUpdateManyWithoutTeacherNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutStudentNestedInput;
    progress?: Prisma.StudentProgressUncheckedUpdateManyWithoutStudentNestedInput;
    testResults?: Prisma.TestResultUncheckedUpdateManyWithoutStudentNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutStudentNestedInput;
    parentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutParentNestedInput;
    studentOf?: Prisma.ParentStudentUncheckedUpdateManyWithoutStudentNestedInput;
    sentMessages?: Prisma.ChatMessageUncheckedUpdateManyWithoutSenderNestedInput;
};
export type UserCountOutputType = {
    coursesOwned: number;
    enrollments: number;
    progress: number;
    testResults: number;
    payments: number;
    parentOf: number;
    studentOf: number;
    sentMessages: number;
    receivedMessages: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coursesOwned?: boolean | UserCountOutputTypeCountCoursesOwnedArgs;
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs;
    progress?: boolean | UserCountOutputTypeCountProgressArgs;
    testResults?: boolean | UserCountOutputTypeCountTestResultsArgs;
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs;
    parentOf?: boolean | UserCountOutputTypeCountParentOfArgs;
    studentOf?: boolean | UserCountOutputTypeCountStudentOfArgs;
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs;
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs;
};
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
export type UserCountOutputTypeCountCoursesOwnedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseWhereInput;
};
export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EnrollmentWhereInput;
};
export type UserCountOutputTypeCountProgressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StudentProgressWhereInput;
};
export type UserCountOutputTypeCountTestResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestResultWhereInput;
};
export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type UserCountOutputTypeCountParentOfArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentStudentWhereInput;
};
export type UserCountOutputTypeCountStudentOfArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParentStudentWhereInput;
};
export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    phone?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    coursesOwned?: boolean | Prisma.User$coursesOwnedArgs<ExtArgs>;
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    progress?: boolean | Prisma.User$progressArgs<ExtArgs>;
    testResults?: boolean | Prisma.User$testResultsArgs<ExtArgs>;
    payments?: boolean | Prisma.User$paymentsArgs<ExtArgs>;
    parentOf?: boolean | Prisma.User$parentOfArgs<ExtArgs>;
    studentOf?: boolean | Prisma.User$studentOfArgs<ExtArgs>;
    sentMessages?: boolean | Prisma.User$sentMessagesArgs<ExtArgs>;
    receivedMessages?: boolean | Prisma.User$receivedMessagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    phone?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    phone?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    password?: boolean;
    name?: boolean;
    phone?: boolean;
    role?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "password" | "name" | "phone" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    coursesOwned?: boolean | Prisma.User$coursesOwnedArgs<ExtArgs>;
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    progress?: boolean | Prisma.User$progressArgs<ExtArgs>;
    testResults?: boolean | Prisma.User$testResultsArgs<ExtArgs>;
    payments?: boolean | Prisma.User$paymentsArgs<ExtArgs>;
    parentOf?: boolean | Prisma.User$parentOfArgs<ExtArgs>;
    studentOf?: boolean | Prisma.User$studentOfArgs<ExtArgs>;
    sentMessages?: boolean | Prisma.User$sentMessagesArgs<ExtArgs>;
    receivedMessages?: boolean | Prisma.User$receivedMessagesArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        coursesOwned: Prisma.$CoursePayload<ExtArgs>[];
        enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
        progress: Prisma.$StudentProgressPayload<ExtArgs>[];
        testResults: Prisma.$TestResultPayload<ExtArgs>[];
        payments: Prisma.$PaymentPayload<ExtArgs>[];
        parentOf: Prisma.$ParentStudentPayload<ExtArgs>[];
        studentOf: Prisma.$ParentStudentPayload<ExtArgs>[];
        sentMessages: Prisma.$ChatMessagePayload<ExtArgs>[];
        receivedMessages: Prisma.$ChatMessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        phone: string | null;
        role: $Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserFieldRefs;
}
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    coursesOwned<T extends Prisma.User$coursesOwnedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$coursesOwnedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrollments<T extends Prisma.User$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    progress<T extends Prisma.User$progressArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$progressArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StudentProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    testResults<T extends Prisma.User$testResultsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$testResultsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.User$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    parentOf<T extends Prisma.User$parentOfArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$parentOfArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    studentOf<T extends Prisma.User$studentOfArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$studentOfArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParentStudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sentMessages<T extends Prisma.User$sentMessagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    receivedMessages<T extends Prisma.User$receivedMessagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'Role'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    where: Prisma.UserWhereUniqueInput;
};
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where: Prisma.UserWhereUniqueInput;
};
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    limit?: number;
};
export type User$coursesOwnedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseSelect<ExtArgs> | null;
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    include?: Prisma.CourseInclude<ExtArgs> | null;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    cursor?: Prisma.CourseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[];
};
export type User$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EnrollmentSelect<ExtArgs> | null;
    omit?: Prisma.EnrollmentOmit<ExtArgs> | null;
    include?: Prisma.EnrollmentInclude<ExtArgs> | null;
    where?: Prisma.EnrollmentWhereInput;
    orderBy?: Prisma.EnrollmentOrderByWithRelationInput | Prisma.EnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.EnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EnrollmentScalarFieldEnum | Prisma.EnrollmentScalarFieldEnum[];
};
export type User$progressArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StudentProgressSelect<ExtArgs> | null;
    omit?: Prisma.StudentProgressOmit<ExtArgs> | null;
    include?: Prisma.StudentProgressInclude<ExtArgs> | null;
    where?: Prisma.StudentProgressWhereInput;
    orderBy?: Prisma.StudentProgressOrderByWithRelationInput | Prisma.StudentProgressOrderByWithRelationInput[];
    cursor?: Prisma.StudentProgressWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StudentProgressScalarFieldEnum | Prisma.StudentProgressScalarFieldEnum[];
};
export type User$testResultsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestResultSelect<ExtArgs> | null;
    omit?: Prisma.TestResultOmit<ExtArgs> | null;
    include?: Prisma.TestResultInclude<ExtArgs> | null;
    where?: Prisma.TestResultWhereInput;
    orderBy?: Prisma.TestResultOrderByWithRelationInput | Prisma.TestResultOrderByWithRelationInput[];
    cursor?: Prisma.TestResultWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestResultScalarFieldEnum | Prisma.TestResultScalarFieldEnum[];
};
export type User$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type User$parentOfArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentStudentScalarFieldEnum | Prisma.ParentStudentScalarFieldEnum[];
};
export type User$studentOfArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParentStudentSelect<ExtArgs> | null;
    omit?: Prisma.ParentStudentOmit<ExtArgs> | null;
    include?: Prisma.ParentStudentInclude<ExtArgs> | null;
    where?: Prisma.ParentStudentWhereInput;
    orderBy?: Prisma.ParentStudentOrderByWithRelationInput | Prisma.ParentStudentOrderByWithRelationInput[];
    cursor?: Prisma.ParentStudentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParentStudentScalarFieldEnum | Prisma.ParentStudentScalarFieldEnum[];
};
export type User$sentMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageScalarFieldEnum | Prisma.ChatMessageScalarFieldEnum[];
};
export type User$receivedMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageScalarFieldEnum | Prisma.ChatMessageScalarFieldEnum[];
};
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
