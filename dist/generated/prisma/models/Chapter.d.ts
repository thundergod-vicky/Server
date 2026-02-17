import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ChapterModel = runtime.Types.Result.DefaultSelection<Prisma.$ChapterPayload>;
export type AggregateChapter = {
    _count: ChapterCountAggregateOutputType | null;
    _avg: ChapterAvgAggregateOutputType | null;
    _sum: ChapterSumAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
};
export type ChapterAvgAggregateOutputType = {
    order: number | null;
};
export type ChapterSumAggregateOutputType = {
    order: number | null;
};
export type ChapterMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    order: number | null;
    courseId: string | null;
};
export type ChapterMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    order: number | null;
    courseId: string | null;
};
export type ChapterCountAggregateOutputType = {
    id: number;
    title: number;
    order: number;
    courseId: number;
    _all: number;
};
export type ChapterAvgAggregateInputType = {
    order?: true;
};
export type ChapterSumAggregateInputType = {
    order?: true;
};
export type ChapterMinAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    courseId?: true;
};
export type ChapterMaxAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    courseId?: true;
};
export type ChapterCountAggregateInputType = {
    id?: true;
    title?: true;
    order?: true;
    courseId?: true;
    _all?: true;
};
export type ChapterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChapterCountAggregateInputType;
    _avg?: ChapterAvgAggregateInputType;
    _sum?: ChapterSumAggregateInputType;
    _min?: ChapterMinAggregateInputType;
    _max?: ChapterMaxAggregateInputType;
};
export type GetChapterAggregateType<T extends ChapterAggregateArgs> = {
    [P in keyof T & keyof AggregateChapter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChapter[P]> : Prisma.GetScalarType<T[P], AggregateChapter[P]>;
};
export type ChapterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithAggregationInput | Prisma.ChapterOrderByWithAggregationInput[];
    by: Prisma.ChapterScalarFieldEnum[] | Prisma.ChapterScalarFieldEnum;
    having?: Prisma.ChapterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChapterCountAggregateInputType | true;
    _avg?: ChapterAvgAggregateInputType;
    _sum?: ChapterSumAggregateInputType;
    _min?: ChapterMinAggregateInputType;
    _max?: ChapterMaxAggregateInputType;
};
export type ChapterGroupByOutputType = {
    id: string;
    title: string;
    order: number;
    courseId: string;
    _count: ChapterCountAggregateOutputType | null;
    _avg: ChapterAvgAggregateOutputType | null;
    _sum: ChapterSumAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
};
type GetChapterGroupByPayload<T extends ChapterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChapterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChapterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChapterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChapterGroupByOutputType[P]>;
}>>;
export type ChapterWhereInput = {
    AND?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    OR?: Prisma.ChapterWhereInput[];
    NOT?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    id?: Prisma.StringFilter<"Chapter"> | string;
    title?: Prisma.StringFilter<"Chapter"> | string;
    order?: Prisma.IntFilter<"Chapter"> | number;
    courseId?: Prisma.StringFilter<"Chapter"> | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    lessons?: Prisma.LessonListRelationFilter;
    tests?: Prisma.TestListRelationFilter;
};
export type ChapterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    course?: Prisma.CourseOrderByWithRelationInput;
    lessons?: Prisma.LessonOrderByRelationAggregateInput;
    tests?: Prisma.TestOrderByRelationAggregateInput;
};
export type ChapterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    OR?: Prisma.ChapterWhereInput[];
    NOT?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    title?: Prisma.StringFilter<"Chapter"> | string;
    order?: Prisma.IntFilter<"Chapter"> | number;
    courseId?: Prisma.StringFilter<"Chapter"> | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    lessons?: Prisma.LessonListRelationFilter;
    tests?: Prisma.TestListRelationFilter;
}, "id">;
export type ChapterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    _count?: Prisma.ChapterCountOrderByAggregateInput;
    _avg?: Prisma.ChapterAvgOrderByAggregateInput;
    _max?: Prisma.ChapterMaxOrderByAggregateInput;
    _min?: Prisma.ChapterMinOrderByAggregateInput;
    _sum?: Prisma.ChapterSumOrderByAggregateInput;
};
export type ChapterScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChapterScalarWhereWithAggregatesInput | Prisma.ChapterScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChapterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChapterScalarWhereWithAggregatesInput | Prisma.ChapterScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Chapter"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Chapter"> | string;
    order?: Prisma.IntWithAggregatesFilter<"Chapter"> | number;
    courseId?: Prisma.StringWithAggregatesFilter<"Chapter"> | string;
};
export type ChapterCreateInput = {
    id?: string;
    title: string;
    order: number;
    course: Prisma.CourseCreateNestedOneWithoutChaptersInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
    tests?: Prisma.TestCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateInput = {
    id?: string;
    title: string;
    order: number;
    courseId: string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
    tests?: Prisma.TestUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    course?: Prisma.CourseUpdateOneRequiredWithoutChaptersNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
    tests?: Prisma.TestUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
    tests?: Prisma.TestUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateManyInput = {
    id?: string;
    title: string;
    order: number;
    courseId: string;
};
export type ChapterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ChapterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ChapterListRelationFilter = {
    every?: Prisma.ChapterWhereInput;
    some?: Prisma.ChapterWhereInput;
    none?: Prisma.ChapterWhereInput;
};
export type ChapterOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChapterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
};
export type ChapterAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type ChapterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
};
export type ChapterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
};
export type ChapterSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
};
export type ChapterScalarRelationFilter = {
    is?: Prisma.ChapterWhereInput;
    isNot?: Prisma.ChapterWhereInput;
};
export type ChapterCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput> | Prisma.ChapterCreateWithoutCourseInput[] | Prisma.ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCourseInput | Prisma.ChapterCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.ChapterCreateManyCourseInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput> | Prisma.ChapterCreateWithoutCourseInput[] | Prisma.ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCourseInput | Prisma.ChapterCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.ChapterCreateManyCourseInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput> | Prisma.ChapterCreateWithoutCourseInput[] | Prisma.ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCourseInput | Prisma.ChapterCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutCourseInput | Prisma.ChapterUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.ChapterCreateManyCourseInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutCourseInput | Prisma.ChapterUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutCourseInput | Prisma.ChapterUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type ChapterUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput> | Prisma.ChapterCreateWithoutCourseInput[] | Prisma.ChapterUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCourseInput | Prisma.ChapterCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutCourseInput | Prisma.ChapterUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.ChapterCreateManyCourseInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutCourseInput | Prisma.ChapterUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutCourseInput | Prisma.ChapterUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type ChapterCreateNestedOneWithoutLessonsInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutLessonsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateOneRequiredWithoutLessonsNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutLessonsInput;
    upsert?: Prisma.ChapterUpsertWithoutLessonsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChapterUpdateToOneWithWhereWithoutLessonsInput, Prisma.ChapterUpdateWithoutLessonsInput>, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
};
export type ChapterCreateNestedOneWithoutTestsInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutTestsInput, Prisma.ChapterUncheckedCreateWithoutTestsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutTestsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateOneRequiredWithoutTestsNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutTestsInput, Prisma.ChapterUncheckedCreateWithoutTestsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutTestsInput;
    upsert?: Prisma.ChapterUpsertWithoutTestsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChapterUpdateToOneWithWhereWithoutTestsInput, Prisma.ChapterUpdateWithoutTestsInput>, Prisma.ChapterUncheckedUpdateWithoutTestsInput>;
};
export type ChapterCreateWithoutCourseInput = {
    id?: string;
    title: string;
    order: number;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
    tests?: Prisma.TestCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutCourseInput = {
    id?: string;
    title: string;
    order: number;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
    tests?: Prisma.TestUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutCourseInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput>;
};
export type ChapterCreateManyCourseInputEnvelope = {
    data: Prisma.ChapterCreateManyCourseInput | Prisma.ChapterCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type ChapterUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.ChapterWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutCourseInput, Prisma.ChapterUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutCourseInput, Prisma.ChapterUncheckedCreateWithoutCourseInput>;
};
export type ChapterUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.ChapterWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutCourseInput, Prisma.ChapterUncheckedUpdateWithoutCourseInput>;
};
export type ChapterUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.ChapterScalarWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyWithoutCourseInput>;
};
export type ChapterScalarWhereInput = {
    AND?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
    OR?: Prisma.ChapterScalarWhereInput[];
    NOT?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
    id?: Prisma.StringFilter<"Chapter"> | string;
    title?: Prisma.StringFilter<"Chapter"> | string;
    order?: Prisma.IntFilter<"Chapter"> | number;
    courseId?: Prisma.StringFilter<"Chapter"> | string;
};
export type ChapterCreateWithoutLessonsInput = {
    id?: string;
    title: string;
    order: number;
    course: Prisma.CourseCreateNestedOneWithoutChaptersInput;
    tests?: Prisma.TestCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutLessonsInput = {
    id?: string;
    title: string;
    order: number;
    courseId: string;
    tests?: Prisma.TestUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutLessonsInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
};
export type ChapterUpsertWithoutLessonsInput = {
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutLessonsInput, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    where?: Prisma.ChapterWhereInput;
};
export type ChapterUpdateToOneWithWhereWithoutLessonsInput = {
    where?: Prisma.ChapterWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutLessonsInput, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
};
export type ChapterUpdateWithoutLessonsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    course?: Prisma.CourseUpdateOneRequiredWithoutChaptersNestedInput;
    tests?: Prisma.TestUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutLessonsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    tests?: Prisma.TestUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateWithoutTestsInput = {
    id?: string;
    title: string;
    order: number;
    course: Prisma.CourseCreateNestedOneWithoutChaptersInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutTestsInput = {
    id?: string;
    title: string;
    order: number;
    courseId: string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutTestsInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutTestsInput, Prisma.ChapterUncheckedCreateWithoutTestsInput>;
};
export type ChapterUpsertWithoutTestsInput = {
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutTestsInput, Prisma.ChapterUncheckedUpdateWithoutTestsInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutTestsInput, Prisma.ChapterUncheckedCreateWithoutTestsInput>;
    where?: Prisma.ChapterWhereInput;
};
export type ChapterUpdateToOneWithWhereWithoutTestsInput = {
    where?: Prisma.ChapterWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutTestsInput, Prisma.ChapterUncheckedUpdateWithoutTestsInput>;
};
export type ChapterUpdateWithoutTestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    course?: Prisma.CourseUpdateOneRequiredWithoutChaptersNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutTestsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateManyCourseInput = {
    id?: string;
    title: string;
    order: number;
};
export type ChapterUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
    tests?: Prisma.TestUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
    tests?: Prisma.TestUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type ChapterCountOutputType = {
    lessons: number;
    tests: number;
};
export type ChapterCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lessons?: boolean | ChapterCountOutputTypeCountLessonsArgs;
    tests?: boolean | ChapterCountOutputTypeCountTestsArgs;
};
export type ChapterCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterCountOutputTypeSelect<ExtArgs> | null;
};
export type ChapterCountOutputTypeCountLessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
};
export type ChapterCountOutputTypeCountTestsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TestWhereInput;
};
export type ChapterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    courseId?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    lessons?: boolean | Prisma.Chapter$lessonsArgs<ExtArgs>;
    tests?: boolean | Prisma.Chapter$testsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChapterCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    courseId?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    order?: boolean;
    courseId?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectScalar = {
    id?: boolean;
    title?: boolean;
    order?: boolean;
    courseId?: boolean;
};
export type ChapterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "order" | "courseId", ExtArgs["result"]["chapter"]>;
export type ChapterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    lessons?: boolean | Prisma.Chapter$lessonsArgs<ExtArgs>;
    tests?: boolean | Prisma.Chapter$testsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChapterCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ChapterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type ChapterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
};
export type $ChapterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Chapter";
    objects: {
        course: Prisma.$CoursePayload<ExtArgs>;
        lessons: Prisma.$LessonPayload<ExtArgs>[];
        tests: Prisma.$TestPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        order: number;
        courseId: string;
    }, ExtArgs["result"]["chapter"]>;
    composites: {};
};
export type ChapterGetPayload<S extends boolean | null | undefined | ChapterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChapterPayload, S>;
export type ChapterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChapterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChapterCountAggregateInputType | true;
};
export interface ChapterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Chapter'];
        meta: {
            name: 'Chapter';
        };
    };
    findUnique<T extends ChapterFindUniqueArgs>(args: Prisma.SelectSubset<T, ChapterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChapterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChapterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChapterFindFirstArgs>(args?: Prisma.SelectSubset<T, ChapterFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChapterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChapterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChapterFindManyArgs>(args?: Prisma.SelectSubset<T, ChapterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChapterCreateArgs>(args: Prisma.SelectSubset<T, ChapterCreateArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChapterCreateManyArgs>(args?: Prisma.SelectSubset<T, ChapterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChapterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChapterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChapterDeleteArgs>(args: Prisma.SelectSubset<T, ChapterDeleteArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChapterUpdateArgs>(args: Prisma.SelectSubset<T, ChapterUpdateArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChapterDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChapterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChapterUpdateManyArgs>(args: Prisma.SelectSubset<T, ChapterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChapterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChapterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChapterUpsertArgs>(args: Prisma.SelectSubset<T, ChapterUpsertArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChapterCountArgs>(args?: Prisma.Subset<T, ChapterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChapterCountAggregateOutputType> : number>;
    aggregate<T extends ChapterAggregateArgs>(args: Prisma.Subset<T, ChapterAggregateArgs>): Prisma.PrismaPromise<GetChapterAggregateType<T>>;
    groupBy<T extends ChapterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChapterGroupByArgs['orderBy'];
    } : {
        orderBy?: ChapterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChapterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChapterFieldRefs;
}
export interface Prisma__ChapterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lessons<T extends Prisma.Chapter$lessonsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chapter$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tests<T extends Prisma.Chapter$testsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chapter$testsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChapterFieldRefs {
    readonly id: Prisma.FieldRef<"Chapter", 'String'>;
    readonly title: Prisma.FieldRef<"Chapter", 'String'>;
    readonly order: Prisma.FieldRef<"Chapter", 'Int'>;
    readonly courseId: Prisma.FieldRef<"Chapter", 'String'>;
}
export type ChapterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterCreateInput, Prisma.ChapterUncheckedCreateInput>;
};
export type ChapterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChapterCreateManyInput | Prisma.ChapterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChapterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    data: Prisma.ChapterCreateManyInput | Prisma.ChapterCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChapterIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChapterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterUpdateInput, Prisma.ChapterUncheckedUpdateInput>;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyInput>;
    where?: Prisma.ChapterWhereInput;
    limit?: number;
};
export type ChapterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyInput>;
    where?: Prisma.ChapterWhereInput;
    limit?: number;
    include?: Prisma.ChapterIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChapterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateInput, Prisma.ChapterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChapterUpdateInput, Prisma.ChapterUncheckedUpdateInput>;
};
export type ChapterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    limit?: number;
};
export type Chapter$lessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type Chapter$testsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TestSelect<ExtArgs> | null;
    omit?: Prisma.TestOmit<ExtArgs> | null;
    include?: Prisma.TestInclude<ExtArgs> | null;
    where?: Prisma.TestWhereInput;
    orderBy?: Prisma.TestOrderByWithRelationInput | Prisma.TestOrderByWithRelationInput[];
    cursor?: Prisma.TestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TestScalarFieldEnum | Prisma.TestScalarFieldEnum[];
};
export type ChapterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
};
export {};
